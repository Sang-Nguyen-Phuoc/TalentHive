import { Request, Response, NextFunction } from "express";

import TokenBlacklist from "../models/tokenBlacklist";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";
import { accessToken, checkIfAccessTokenInBlacklist } from "../utils/tokenServices";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(new AppError("Please provide access token", 400));
    }

    // 2. Check if token is blacklisted
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
        return next(new AppError("Token is invalid", 404));
    }

    try {
        // 3. Verify token
        // const decoded = tokenGenerator.verifyAccessToken(token);

        // 4. Check if user still exists
        // const currentUser = await User.findById(decoded.id);
        // if (!currentUser) {
        //     return next(new AppError('User no longer exists', 401));
        // }

        // Grant access to protected route
        // req.body.user = currentUser;
        next();
    } catch (error) {
        return next(new AppError("Invalid token", 401));
    }
};

export const attachUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : null;

    if (await checkIfAccessTokenInBlacklist(accessToken!)) {
        return next(new AppError("accessToken is blacklisted", 401));
    }

    if (!accessToken) {
        return next(new AppError("accessToken must be sent into body", 400));
    }
    if (!process.env.JWT_ACCESS_SECRET) {
        return next(new AppError("The JWT_ACCESS_SECRET variable is not defined", 500));
    }


    let decode: any;
    try {
        decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("accessToken expired", 401));
        } else {
            return next(new AppError("Invalid accesstoken", 401));
        }
    }
    const userId = decode.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new AppError("userId in accesstoken is not valid", 401));
    }

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError("User in accesstoken is not valid", 401));
    }

    // Grant access to protected route
    req.body.user = user;
    req.body.userId = userId;
    req.body.accessToken = accessToken;

    next();
});

type Role = "admin" | "employer" | "candidate";

export const authorizeRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.user) {
            return next(new AppError("attachUserId middleware must be called before authorizeRole middleware", 500));
        }
        if (!roles.includes(req.body.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }
        next();
    };
}