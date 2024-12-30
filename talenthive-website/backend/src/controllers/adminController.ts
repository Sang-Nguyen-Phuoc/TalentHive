import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Log from "../models/log";

export const monthlyLogins = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const timestamp = new Date();
    const monthlyLogins = await Log.aggregate([
        { $match: { action: "login" } }, // Chỉ lấy log đăng nhập
        {
            $group: {
                _id: {
                    year: { $year: "$timestamp" },
                    month: { $month: "$timestamp" },
                    day: { $dayOfMonth: "$timestamp" },
                },
                count: { $sum: 1 }, // Đếm số lần đăng nhập
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sắp xếp theo thời gian
    ]);

    res.status(200).json({
        status: "success",
        data: {
            monthlyLogins,
        },
    })
});
