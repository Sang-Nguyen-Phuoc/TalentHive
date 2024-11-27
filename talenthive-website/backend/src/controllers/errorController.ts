import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";

    if (req.originalUrl.startsWith("/api")) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
}

export default globalErrorHandler;