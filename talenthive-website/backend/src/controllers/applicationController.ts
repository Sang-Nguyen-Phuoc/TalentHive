import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { isNotFound, isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import Application from "../models/application";
import Job from "../models/job";
import Company from "../models/company";
import app from "../app";

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




export const getApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const { applicationId } = req.params;
    isObjectIdOfMongoDB(applicationId, "applicationId", `Invalid application id: ${applicationId} in params`);
    
    const application = await Application.findOne({_id: applicationId, candidate_id: user._id});
    isNotFound(application, "application", `No application found with id: ${applicationId}`);

    const job = await Job.findById(application!.job_id);
    isNotFound(job, "job", `No job found with id: ${application!.job_id}`);

    const company = await Company.findById(job!.company_id);
    isNotFound(company, "company", `No company found with id: ${job!.company_id}`);

    const filteredApplication = {
        _id: application!._id || null,
        status: application!.status || null,
        full_name: application!.full_name || null,
        email: application!.email || null,
        phone: application!.phone  || null,
        skills: application!.skills || null,
        worker_experience: application!.worker_experience || null,
        certification: application!.certification || null,
        cover_letter: application!.cover_letter || null,
        cv: application!.cv || null,

        job: job || null,
        company: company || null,
    }

    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application: filteredApplication
        }
    });
});

export const getMyAppliedJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const applications = await Application.find({ candidate_id: user._id })
        .populate({
            path: "job_id",
            populate: [
                {path: "job_category"},
                {path: "job_type"},
                {path: "company_id"}
            ]
        })
        .lean();
    const jobs = applications.map((application: any) => !application.job_id ? undefined : ({
        ...application.job_id,
        application: {
            _id: application._id || null,
            status: application.status || null,
            applied_at: application.applied_at || null,
            full_name: application.full_name || null,
            email: application.email || null,
            phone: application.phone || null,
            skills: application.skills || null,
            worker_experience: application.worker_experience || null,
            certification: application.certification || null,
            cover_letter: application.cover_letter || null,
            cv: application.cv || null,
        },
        company: application.job_id?.company_id || null,
        company_id: undefined,
    }));

    const filteredJobs = jobs.map((job: any) => ({
        ...job,
        job_id: undefined,
        job_category: job?.job_category?.name || null,
        job_type: job?.job_type?.name || null,
        salary_range: job.salary_range ? `${job.salary_range.min} - ${job.salary_range.max} ${job.salary_unit}` : null,
    }))

    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total: jobs.length,
            jobs: filteredJobs
        }
    });
});

export const getApplicationForJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { jobId } = req.params;
    isObjectIdOfMongoDB(jobId, "jobId", `Invalid job id: ${jobId} in params`);

    const application = await Application.findOne({ job_id: jobId, candidate_id: user._id });

    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application
        }
    });
});
