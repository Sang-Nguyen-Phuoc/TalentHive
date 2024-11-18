import mongoose from "mongoose";
import statusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import WorkerProfile from "../models/workerProfile";

export const deleteUserByCandidateId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid ID", statusCodes.BAD_REQUEST));
        }
        const candidateProfile = await WorkerProfile.findById(id);
        if (!candidateProfile) {
            return next(
                new AppError(`candidateProfile with id: ${id} not found`, statusCodes.NOT_FOUND)
            );
        }
        const user = await User.findById(candidateProfile.user_id);
        if (!user) {
            return next(
                new AppError(
                    `User with id: ${candidateProfile.user_id} not found`,
                    statusCodes.NOT_FOUND
                )
            );
        }

        await candidateProfile.updateOne({ active: false });
        await user.updateOne({ active: false });

        res.status(statusCodes.OK).json({
            status: "success",
            data: {
                user: null,
            },
        });
    }
);
