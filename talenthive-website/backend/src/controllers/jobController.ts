import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/job";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import Application from "../models/application";


import { StatusCodes } from "http-status-codes";

export const createJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        title,
        company_id,
        location,
        job_type,
        description,
        requirements,
        benefits,
        employer_id,
        expires_at,
        job_category,
        skills,
        salary_range,
        is_public
    } = req.body;


    const job = await Job.create({
        title: title,
        company_id: company_id,
        location: location,
        job_type: job_type,
        description: description,
        requirements: requirements,
        benefits: benefits,
        employer_id: employer_id,
        expires_at: expires_at,
        job_category: job_category,
        skills: skills,
        salary_range: salary_range,
        is_public: is_public,
        posted_at: new Date(),
        views: 0,
        applications_count: 0,
    });

    await job.save();

    res.status(201).json({
        status: "success",
        data: {
            job: job,
        },
    });
});

export const getAllJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 

    const page = (req.query.page ? parseInt(req.query.page as string, 10) : 1);
    const limit = (req.query.limit ? parseInt(req.query.limit as string, 10) : 0);

    if (page < 1) {
        return next(new AppError("Invalid page number", StatusCodes.BAD_REQUEST));
    }

    if (limit < 0) {
        return next(new AppError("Invalid limit number", StatusCodes.BAD_REQUEST));
    }

    // count total number of jobs
    const totalJobs = await Job.countDocuments();

    // calculate max page number
    const maxPage = limit != 0 ? Math.ceil(totalJobs / limit) : null;

    // if page number exceeds total number of pages, return error
    if (maxPage && page > maxPage) {
        return next(new AppError("Page number exceeds total number of pages", StatusCodes.BAD_REQUEST));
    }

    // calculate number of jobs to skip
    const skip = (page - 1) * limit; 

    // if page and limit are not provided, return all jobs
    const jobs = await Job.find().skip(skip).limit(limit)
                                            .populate("company_id")
                                            .populate("employer_id")
                                            .populate("job_type")
                                            .populate("job_category");

   
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            "total_jobs": totalJobs,
            "max_page": maxPage,
            "jobs": jobs,
        },
    });
});

export const deleteJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        return next(new AppError("Job ID not found", StatusCodes.NOT_FOUND));
    }

    await Job.deleteOne({ _id: jobId });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            job: null
        }
    });
});

export const getAJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }
    
    const job = await Job.findOne({ _id: jobId }).populate("company_id")
                                                .populate("employer_id")
                                                .populate("job_type")
                                                .populate("job_category");

    if (!job) {
        return next(new AppError("Job ID not found", StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            "job": job
        }
    });
});

export const updateJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const jobId = req.params.jobId;
   
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }

    // find job by ID
    const job = await Job.findOne({_id: jobId});
    if (!job) {
        return next(new AppError("Job ID not found", StatusCodes.NOT_FOUND));
    }

    const {
        title,
        company_id,
        employer_id,
        salary_range,
        location,
        description,
        skills,
        requirements,
        benefits,
        expires_at,
        job_type,
        job_category,
        is_public,
    } = req.body;

    // update job fields and return updated job
    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId },
        {
            title: title || job.title,
            company_id: company_id || job.company_id,
            employer_id: employer_id || job.employer_id,
            salary_range: salary_range || job.salary_range,
            location: location || job.location,
            description: description || job.description,
            skills: skills || job.skills,
            requirements: requirements || job.requirements,
            benefits: benefits || job.benefits,
            expires_at: expires_at || job.expires_at,
            job_type: job_type || job.job_type,
            job_category: job_category || job.job_category,
            is_public: is_public || job.is_public,
        },
        { new: true }
    );

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            job: updatedJob,
        },
    });
});


export const createApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    const candidateId = req.body.userId;

    const {
        full_name,
        resume,
        email,
        cover_letter,
        phone,
    } = req.body;

    const application = await Application.create({
        job_id: jobId,
        candidate_id: candidateId,
        full_name: full_name,
        resume: resume,
        email: email,
        cover_letter: cover_letter,
        phone: phone,
        status: "pending",
        applied_at: new Date()
    });

    await application.save();

    res.status(201).json({
        status: "success",
        data: {
            application: application,
        },
    });

});


export const updateApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    const userId = req.body.userId;

    const application = await Application.findOne({
        job_id: jobId,
        worker_id: userId,
    });

    if (!application) {
        return next(new AppError("Application not found", 404));
    }

    const { full_name, resume, email, cover_letter, phone } = req.body;

    const updatedApplication = await Application.findOneAndUpdate(
        { _id: application._id },
        {
            full_name: full_name || application.full_name,
            resume: resume || application.resume,
            email: email || application.email,
            cover_letter: cover_letter || application.cover_letter,
            phone: phone || application.phone,
        },
        { new: true }
    );

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application: updatedApplication,
        },
    });
});

export const deleteApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    const workerId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(workerId)) {
        return next(new AppError("Invalid worker ID", 400));
    }

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        return next(new AppError("Job ID not found", 404));
    }

    const application = await Application.findOne({
        job_id: jobId,
        worker_id: workerId,
    });

    if (!application) {
        return next(new AppError("Application not found", 404));
    }

    await Application.deleteOne({ _id: application._id });

    res.status(200).json({
        status: "success",
        data: {
            application: null
        }
    });
});

export const searchJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, company_id, salary_range, location, skills, job_type, job_category } = req.query;

    const filter: any = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (company_id) filter.company_id = new mongoose.Types.ObjectId(company_id.toString().trim());
   
   
    if (location) filter.location = { $regex: location, $options: "i" };
    if (job_type) filter.job_type = job_type;
    if (job_category) filter.job_category = job_category;

    // Parse salary_range
    if (salary_range) {
        const [min, max] = (salary_range as string).split('-').map(Number);
        filter.$and = [
            { 'salary_range.min': { $gte: min } },
            { 'salary_range.max': { $lte: max } }
        ];
    }

    // Parse skills with case-insensitive matching
    if (skills) {
        const skillArray = Array.isArray(skills) ? skills : [skills];
        filter.skills = {
            $elemMatch: {
                $in: skillArray.map(skill => new RegExp(`^${skill}$`, "i")) // Create case-insensitive regex for each skill
            }
        };
    }

    const jobs = await Job.find(filter)
                          .populate("company_id")
                          .populate("job_type")
                          .populate("job_category")
                          .populate("employer_id")


    res.status(200).json({
        status: "success",
        data: {
            jobs,
        },
    });
});