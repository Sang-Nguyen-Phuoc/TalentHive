import { Request, Response, NextFunction } from "express";

import TokenBlacklist from "../models/tokenBlacklist";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";
import { checkIfAccessTokenInBlacklist } from "../utils/tokenServices";
import { StatusCodes } from "http-status-codes";

export const attachUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : null;

    if (!accessToken) {
        return next(new AppError("accessToken must be sent into header with bearer-token", StatusCodes.UNAUTHORIZED));
    }

    if (await checkIfAccessTokenInBlacklist(accessToken!)) {
        return next(new AppError("accessToken is blacklisted", StatusCodes.UNAUTHORIZED));
    }

    if (!process.env.JWT_ACCESS_SECRET) {
        return next(
            new AppError(
                "The JWT_ACCESS_SECRET variable is not defined",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        );
    }

    let decode: any;
    try {
        decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("accessToken expired", StatusCodes.UNAUTHORIZED));
        } else {
            return next(new AppError("Invalid accesstoken", StatusCodes.UNAUTHORIZED));
        }
    }
    const userId = decode.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new AppError("userId in accesstoken is not valid", StatusCodes.UNAUTHORIZED));
    }

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError("User in accesstoken is not valid", StatusCodes.UNAUTHORIZED));
    }

    // Grant access to protected route
    req.body.user = user;
    req.body.userId = userId;
    req.body.accessToken = accessToken;

    next();
});

type Role = "admin" | "employer" | "candidate";

// if roles is not provided, it will authorize all roles
export const authorizeRole = (roles?: Role[] | undefined) => {
    return (req: Request, res: Response, next: NextFunction) => {
        attachUserId(req, res, next);
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
    };
};
