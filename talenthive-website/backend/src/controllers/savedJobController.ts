import { Request, Response, NextFunction } from "express";

import SavedJob from "../models/savedJob";
import catchAsync from "../utils/catchAsync";
import { isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import AppError from "../utils/appError";
import Job from "../models/job";

export const getAllSavedJobs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const savedJobs = await SavedJob.find();

        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                saved_jobs_count: savedJobs.length,
                saved_job_list: savedJobs,
            },
        });
    }
);

export const saveJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, jobId } = req.body;
    isRequired(userId, "userId");
    isRequired(jobId, "jobId");
    isObjectIdOfMongoDB(userId, "userId");
    isObjectIdOfMongoDB(jobId, "jobId");

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError(`User with id ${userId} not found`, StatusCodes.NOT_FOUND));
    }

    if (user.role !== "candidate") {
        return next(
            new AppError(`User with id ${userId} is not a candidate`, StatusCodes.BAD_REQUEST)
        );
    }

    const job = await Job.findById(jobId);
    if (!job) {
        return next(new AppError(`Job with id ${jobId} not found`, StatusCodes.NOT_FOUND));
    }

    const existingSavedJob = await SavedJob.findOne({
        userId: userId,
        jobId: jobId,
    });
    if (existingSavedJob) {
        return next(
            new AppError(
                `User with id ${userId} already saved job with id ${jobId}`,
                StatusCodes.BAD_REQUEST
            )
        );
    }

    const savedJob = await SavedJob.create(req.body);
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            saved_job: savedJob,
        },
    });
});

export const deleteSavedJob = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        isObjectIdOfMongoDB(id, "id");
        const savedJob = await SavedJob.findById(id);
        if (!savedJob) {
            return next(new AppError(`Saved job with id ${id} not found`, StatusCodes.NOT_FOUND));
        }
        await SavedJob.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                saved_job: null,
            },
        });
    }
);
