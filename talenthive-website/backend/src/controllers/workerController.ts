import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Worker from "../models/workerProfile";
import AppError from "../utils/appError";


export const getAllWorkers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const workers = await Worker.find().populate("user_id");
    res.status(200).json({
        status: "success",
        data: {
            workers,
        },
    });
});