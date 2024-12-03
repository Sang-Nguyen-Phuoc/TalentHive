import { IUser } from "../models/user";
import TokenBlacklist from "../models/tokenBlacklist";
import jwt from "jsonwebtoken";
import AppError from "./appError";
import { Response } from "express";

export const accessToken = (user: IUser) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new AppError("JWT_ACCESS_SECRET not defined", 500);
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1h",
    });
};

export const refreshToken = (user: IUser) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new AppError("JWT_REFRESH_SECRET not defined", 500);
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};

export const invalidateToken = async (token: string) => {
    if (!token) {
        throw new Error("Token is not valid");
    }

    await TokenBlacklist.create({ token });

    return {
        token,
        invalidatedAt: Date.now(),
    };
};

export const checkIfAccessTokenInBlacklist = async (token: string) => {
    if (!token) {
        throw new AppError("Token is not valid", 400);
    }

    const isBlacklisted = await TokenBlacklist.findOne({
        token,
    });

    return !!isBlacklisted;
};

export const verifyAccessToken = (token: string) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("JWT_ACCESS_SECRET not defined");
    }
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { id: string; role: string };
};

export const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const refreshTokenStr = refreshToken(user);
    const accessTokenStr = accessToken(user);

    res.cookie("refreshToken", refreshTokenStr, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
    });
    // httpOnly: true,
    // path: "/",
    // sameSite: "strict",
    
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
            accessToken: accessTokenStr,
        },
    });
};
