import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Worker from "../models/workerProfile";
import AppError from "../utils/appError";


const getAllWorkers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workers = await Worker.find().populate("user_id");
        res.status(200).json({
            status: "success",
            data: {
                workers,
            },
        });
    } catch(err) {
        return next(new AppError("Database error", 400));        
    }
});

export { 
    getAllWorkers
};