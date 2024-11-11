import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/job";
import Company from "../models/company";
import AppError from "../utils/appError";
import EmployerProfile from "../models/employerProfile";
import JobType from "../models/jobType";
import JobCategory from "../models/jobCategory";
import mongoose from "mongoose";




export const createJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        title,
        company_id,
        location,
        job_type_id,
        description,
        requirements,
        benefits,
        employer_id,
        expires_at,
        job_category_id,
        skills
    } = req.body;


    if (!title) {
        return next(new AppError("title is reqired", 400));
    }
    if (!company_id) {
        return next(new AppError("company_id is reqired", 400));
    }
    if (!employer_id) {
        return next(new AppError("employer_id is reqired", 400));
    }
    if (!expires_at) {
        return next(new AppError("expires_at is reqired", 400));
    }

    // check if request params are valid
    if (!mongoose.Types.ObjectId.isValid(company_id) || !(await Company.findById(company_id))) {
        return next(new AppError("company_id is not valid", 400));
    }

    if (
        !mongoose.Types.ObjectId.isValid(employer_id) ||
        !(await EmployerProfile.findById(employer_id))
    ) {
        return next(new AppError("employer_id is not valid", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(job_type_id) || !(await JobType.findById(job_type_id))) {
        return next(new AppError("job_type_id is not valid", 400));
    }

    if (
        !mongoose.Types.ObjectId.isValid(job_category_id) ||
        !(await JobCategory.findById(job_category_id))
    ) {
        return next(new AppError("job_category_id is not valid", 400));
    }

    if (
        requirements &&
        (!Array.isArray(requirements) || !requirements.every((req) => typeof req === "string"))
    ) {
        return next(new AppError("requirements must be an array of strings", 400));
    }

    if (
        benefits &&
        (!Array.isArray(benefits) || !benefits.every((benefit) => typeof benefit === "string"))
    ) {
        return next(new AppError("benefits must be an array of strings", 400));
    }
    if (
        skills &&
        (!Array.isArray(skills) || !skills.every((benefit) => typeof benefit === "string"))
    ) {
        return next(new AppError("skills must be an array of strings", 400));
    }

    if (expires_at && isNaN(Date.parse(expires_at))) {
        return next(new AppError("Invalid expires_at DATE format", 400));
    }

    if (expires_at && new Date(expires_at) <= new Date()) {
        return next(new AppError("expires_at must be a future date", 400));
    }



    const job = await Job.create({
        title: title,
        company_id: company_id,
        location: location,
        job_type: job_type_id,
        description: description,
        requirements: requirements,
        benefits: benefits,
        employer_id: employer_id,
        expires_at: expires_at,
        job_category: job_category_id,
        skills: skills
    });

    res.status(201).json({
        status: "success",
        data: {
            job: job,
        },
    });
});

const getAllJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 

    const page = (req.query.page ? parseInt(req.query.page as string, 10) : 1);
    const limit = (req.query.limit ? parseInt(req.query.limit as string, 10) : 0);

    if (page < 1) {
        return next(new AppError("Invalid page number", 400));
    }

    if (limit < 0) {
        return next(new AppError("Invalid limit number", 400));
    }

    // count total number of jobs
    const totalJobs = await Job.countDocuments();

    // calculate max page number
    const maxPage = limit != 0 ? Math.ceil(totalJobs / limit) : null;

    // if page number exceeds total number of pages, return error
    if (maxPage && page > maxPage) {
        return next(new AppError("Page number exceeds total number of pages", 400));
    }

    // calculate number of jobs to skip
    const skip = (page - 1) * limit; 

    // if page and limit are not provided, return all jobs
    const jobs = await Job.find().skip(skip).limit(limit)
                                            .populate("company_id")
                                            .populate("employer_id")
                                            .populate("job_type")
                                            .populate("job_category");

   
    res.status(200).json({
        status: "success",
        data: {
            "total_jobs": totalJobs,
            "max_page": maxPage,
            "jobs": jobs,
        },
    });
});

const deleteJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", 400));
    }

    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        return next(new AppError("Job ID not found", 404));
    }

    await Job.deleteOne({ _id: jobId });

    res.status(200).json({
        status: "success",
        data: {
            job: null
        }
    });
});

const updateJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const jobId = req.params.jobId;
   
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", 400));
    }

    // find job by ID
    const job = await Job.findOne({_id: jobId});
    if (!job) {
        return next(new AppError("Job ID not found", 404));
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

    // check if at least one field is provided
    if (!title && !company_id && !employer_id && !salary_range && !location && !description && !skills && !requirements && !benefits && !expires_at && !job_type && !job_category && !is_public) {
        return next(new AppError("At least one field is required", 400));
    }

    // check if missing required fields or invalid fields and return error
    if (title && typeof title !== "string") {
        return next(new AppError("title must be a string", 400));
    }
    if (company_id && !mongoose.Types.ObjectId.isValid(company_id)) {
        return next(new AppError("company_id is not valid", 400));
    }
    if (employer_id && !mongoose.Types.ObjectId.isValid(employer_id)) {
        return next(new AppError("employer_id is not valid", 400));
    }
    if (salary_range && (typeof salary_range.min !== "number" || typeof salary_range.max !== "number")) {
        return next(new AppError("salary_range must be an object with min and max properties", 400));
    }
    if (location && typeof location !== "string") {
        return next(new AppError("location must be a string", 400));
    }
    if (description && typeof description !== "string") {
        return next(new AppError("description must be a string", 400));
    }
    if (skills && (!Array.isArray(skills) || !skills.every((skill) => typeof skill === "string"))) {
        return next(new AppError("skills must be an array of strings", 400));
    }
    if (requirements && (!Array.isArray(requirements) || !requirements.every((require) => typeof require === "string"))) {
        return next(new AppError("requirements must be an array of strings", 400));
    }
    if (benefits && (!Array.isArray(benefits) || !benefits.every((benefit) => typeof benefit === "string"))) {
        return next(new AppError("benefits must be an array of strings", 400));
    }
    if (expires_at && isNaN(Date.parse(expires_at))) {
        return next(new AppError("Invalid expires_at DATE format", 400));
    }
    if (job_type && !mongoose.Types.ObjectId.isValid(job_type)) {
        return next(new AppError("job_type is not valid", 400));
    }
    if (job_category && !mongoose.Types.ObjectId.isValid(job_category)) {
        return next(new AppError("job_category is not valid", 400));
    }
    if (is_public && typeof is_public !== "boolean") {
        return next(new AppError("is_public must be a boolean", 400));
    }

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

    res.status(200).json({
        status: "success",
        data: {
            job: updatedJob,
        },
    });
});

export {
    getAllJobs,
    deleteJob,
    updateJob
};  
