import { Request, Response, NextFunction } from "express";
import Notification from "../models/notification";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const markNotificationAsRead = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { is_read: true }, { new: true });
    if (!notification) {
        return next(new AppError("Notification not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            notification
        }
    });
});