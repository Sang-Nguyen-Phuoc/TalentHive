import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Log from "../models/log";
import AppError from "../utils/appError";

export const monthlyLogins = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
    });
});

export const overview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const overview = await Log.aggregate([
        {
            $group: {
                _id: "$action",
                count: { $sum: 1 },
            },
        },
    ]);

    res.status(200).json({
        status: "success",
        data: {
            overview,
        },
    });
});

export const getActivitiesTrendData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { period, startTime, endTime } = req.query;

    // Convert startTime and endTime to Date objects
    const startDate = new Date(startTime as string || 0);
    const endDate = new Date(endTime as string || Date.now());

    // Filter logs based on the date range
    const matchStage = {
        $match: {
            timestamp: { $gte: startDate, $lte: endDate },
        },
    };

    const groupStage =
        period === "week"
            ? { $project: { week: { $isoWeek: { date: "$timestamp" } }, action: 1 } }
            : { $project: { day: { $dayOfYear: "$timestamp" }, action: 1 } };

    const logs = await Log.aggregate([
        matchStage,
        groupStage,
        { $group: { _id: "$day", count: { $sum: 1 } } }, // Group by day or week
        { $sort: { _id: 1 } }, // Sort by day/week
    ]);

    res.status(200).json({
        status: "success",
        data: {
            logs,
        },
    });
});


export const getLogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userRole, action, startDate, endDate, search } = req.query;

    // Match cơ bản
    const match: any = {};

    // Filter theo action
    if (action) {
        match["action"] = action;
    }

    // Filter theo thời gian
    if (startDate && endDate) {
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        if (start > end) {
            return next(new AppError("Start date must be before end date", 400));
        }

        match["timestamp"] = { $gte: start, $lte: end };
    }

    // Lấy logs, populate user_id và áp dụng lọc
    const logs = await Log.find(match)
        .populate({
            path: "user_id",
            match: userRole ? { role: userRole } : {}, // Lọc theo role nếu có
            select: "email role", // Chỉ lấy email và role
        })
        .sort({ timestamp: -1 });

    const filteredLogs2 = logs.filter((log: any) => !!log?.user_id?.role);

    // Áp dụng search nếu có
    const filteredLogs = filteredLogs2.filter((log: any) => {
        if (!search) return true;
        const userEmail = log.user_id?.email || "";
        const userId = log.user_id?._id?.toString() || "";
        console.log(userEmail, userId, search);
        
        return (
            userEmail.toLowerCase().includes(search.toString().toLowerCase()) ||
            userId === search.toString()
        );
    });

    res.status(200).json({
        status: "success",
        data: {
            total_logs: filteredLogs.length,
            logs: filteredLogs.map((log: any) => ({
                _id: log._id,
                user_id: log.user_id?._id || null,
                user_email: log.user_id?.email || null,
                role: log.user_id?.role || null,
                action: log.action,
                details: log.details,
                timestamp: log.timestamp,
            })),
        },
    });
});
