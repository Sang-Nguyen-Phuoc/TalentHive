import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Job from "../models/job";

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
    const jobs = await Job.find().skip(skip).limit(limit);

   
    res.status(200).json({
        status: "success",
        total_jobs: totalJobs,
        max_page: maxPage,
        data: {
            jobs,
        },
    });
});


export {
    getAllJobs,
};  