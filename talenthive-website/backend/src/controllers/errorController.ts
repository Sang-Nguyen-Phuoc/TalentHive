import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/appError";

const handleLimitFileSizeError = (err: any) => {
    const message = `File size is too large. Maximum allowed size is 1MB.`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";

    if (err.code === "LIMIT_FILE_SIZE") {
        err = handleLimitFileSizeError(err);
    }

    // if (process.env.NODE_ENV === "production") {
    // }  
    console.error("Error 💥", err);

    if (req.originalUrl.startsWith("/api")) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};

export default globalErrorHandler;
