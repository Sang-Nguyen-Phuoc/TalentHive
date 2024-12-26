import { Request, Response, NextFunction } from "express";

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";

export const attachUserId = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken =
        req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.length > 12
            ? req.headers.authorization?.split(" ")[1]
            : null;

    if (!accessToken) {
        throw new AppError(
            "accessToken must be sent into header with bearer-token",
            StatusCodes.UNAUTHORIZED
        );
    }

    if (!process.env.JWT_ACCESS_SECRET) {
        throw new AppError("JWT_ACCESS_SECRET is not defined", StatusCodes.INTERNAL_SERVER_ERROR);
    }

    let decode: any;
    try {
        decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            throw new AppError("Token is expired", StatusCodes.UNAUTHORIZED);
        } else {
            throw new AppError("Token is invalid", StatusCodes.UNAUTHORIZED);
        }
    }
    const userId = decode.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("User in accesstoken is not valid", StatusCodes.UNAUTHORIZED);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", StatusCodes.UNAUTHORIZED);
    }

    // Grant access to protected route
    req.body.user = user;
    req.body.userId = userId;
    
    req.body.accessToken = accessToken;
};

type Role = "admin" | "employer" | "candidate";

// if roles is not provided, it will authorize all roles
export const authorizeRole = (roles?: Role[] | undefined) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await attachUserId(req, res, next);

        if (!req.body.user) {
            return next(
                new AppError(
                    "attachUserId middleware must be called before authorizeRole middleware",
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            );
        }
        if (!roles) {
            roles = ["admin", "employer", "candidate"];
        }
        if (!roles.includes(req.body.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    StatusCodes.FORBIDDEN
                )
            );
        }
        next();
    });
};


export const preserveBodyMiddleware = (req: any, res: any, next: any) => {
    req.savedBody = { ...req.body };
    console.log({ savedBody: req.savedBody });
    next();
};

export const handleUploadAvatar = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...(req as any).savedBody, ...req.body };
    if (!req.files || req.files.length === 0) {
        return next();
    }
    const avatar = (req.files as Express.Multer.File[])[0];
    const { mimetype, buffer } = avatar;
    req.body.avatar = `data:${mimetype};base64,${buffer.toString("base64")}`;
    next();
});