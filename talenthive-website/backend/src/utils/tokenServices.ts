import { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import AppError from "./appError";
import { Response } from "express";

export const accessToken = (user: IUser) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new AppError("JWT_ACCESS_SECRET not defined", 500);
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "10h",
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
