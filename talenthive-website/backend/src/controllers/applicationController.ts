import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { isNotFound, isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import Application from "../models/application";

export const rejectOrAcceptApplication = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { jobId, applicationId } = req.params;
        isObjectIdOfMongoDB(jobId, "jobId");
        isObjectIdOfMongoDB(applicationId, "applicationId");

        const { status } = req.body;
        isRequired(status, "status");

        if (status !== "accepted" && status !== "rejected") {
            return next(new AppError("status must be either accepted or rejected", StatusCodes.BAD_REQUEST));
        }

        const application = await Application.findOneAndUpdate({ _id: applicationId, job_id: jobId }, { status }, { new: true });
        
        isNotFound(application, "application");

        return res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                application
            }
        });
    }
)

