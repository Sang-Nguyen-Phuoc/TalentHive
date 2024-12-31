import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Job from "../models/job";
import AppError from "../utils/appError";
import mongoose, { Types } from "mongoose";
import Application from "../models/application";

import { StatusCodes } from "http-status-codes";
import { isNotFound, isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import EmployerProfile from "../models/employerProfile";
import Company from "../models/company";
import JobType from "../models/jobType";
import JobCategory from "../models/jobCategory";
import path from "path";

export const searchJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { keyword, job_type, job_category, location } = req.query;

    console.log("keyword", keyword);
    
    const filter: any = {};

    // Tìm kiếm theo keyword (áp dụng trên title, skills, introduction, benefits, requirements)
    if (keyword) {
        const keywordRegex = new RegExp(keyword.toString().trim(), "i"); // Case-insensitive
        filter.$or = [
            { title: { $regex: keywordRegex } },
            { skills: { $regex: keywordRegex } },
            { description: { $regex: keywordRegex } }, // Assuming "description" is used for "introduction"
            { benefits: { $regex: keywordRegex } },
            { requirements: { $regex: keywordRegex } },
        ];
    }

    // Tìm kiếm theo jobCategory (dựa trên tên jobCategory)
    if (job_category) {
        const jobCategoryId = await JobCategory.findOne({ name: job_category.toString().trim() });
        filter.job_category = jobCategoryId ? jobCategoryId._id : null;
    }

    // Tìm kiếm theo jobType (dựa trên tên jobType)
    if (job_type) {
        const jobTypeId = await JobType.findOne({ name: job_type.toString().trim() });
        filter.job_type = jobTypeId ? jobTypeId._id : null;
    }

    // Tìm kiếm theo location (áp dụng trên address)
    if (location) {
        const locationRegex = new RegExp(location.toString().trim(), "i"); // Case-insensitive
        filter.address = { $regex: locationRegex };
    }
    
    filter.is_public = true;

    // Truy vấn cơ sở dữ liệu với các bộ lọc
    const jobs = await Job.find(filter)
        .populate("company_id")
        .populate("job_type")
        .populate("job_category")
        .populate("employer_id");

    const jobsFilter = jobs.map((job: any) => {
        return {
            _id: job._id,
            title: job.title,
            company: job?.company_id?.name || null,
            image: job?.company_id?.avatar || null,
            salary: job.salary_range.min + " - " + job.salary_range.max + " USD" || null,
            category: job?.job_category?.name || null,
            address: job.address || null,
            posted_at: job.posted_at || null,
            expires_at: job.expires_at || null,
        };
    })

    // Trả về kết quả
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: jobs.length,
            jobs: jobsFilter,
        },
    });
});


export const getPublicJobList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query;

    const filter: any = { is_public: true };

    let jobs;

    if (page && limit) {
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        jobs = await Job.find(filter)
            .skip(skip)
            .limit(limitNum)
            .populate("company_id")
            .populate("employer_id")
            .populate("job_type")
            .populate("job_category");
    } else {
        jobs = await Job.find(filter)
            .populate("company_id")
            .populate("employer_id")
            .populate("job_type")
            .populate("job_category");
    }

    const totalJobs = await Job.countDocuments(filter);

    const jobsFilter = jobs.map((job: any) => {
        return {
            _id: job._id,
            position: job.title,
            company: job?.company_id?.name || null,
            image: job?.company_id?.avatar || null,
            salary: job.salary_range.min + " - " + job.salary_range.max + " USD" || null,
            category: job?.job_category?.name || null,
            address: job.address || null,
            posted_at: job.posted_at || null,
            expires_at: job.expires_at || null,
        };
    });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: totalJobs,
            pagination:
                page && limit
                    ? {
                          total_received_jobs: totalJobs,
                          total_pages: Math.ceil(totalJobs / parseInt(limit as string, 10)),
                          current_page: parseInt(page as string, 10),
                      }
                    : undefined,
            jobs: jobsFilter,
        },
    });
});

export const getJobList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await Job.find()
        .populate("company_id")
        .populate("employer_id")
        .populate("job_type")
        .populate("job_category");
        res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: jobs.length,
            jobs: jobs,
        },
    });
});

export const getAllJobApplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }

    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 0;

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

    const applications = await Application.find({ job_id: jobId })
        .skip(skip)
        .limit(limit)
        .populate("job_id")
        .populate("candidate_id");

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: totalJobs,
            max_page: maxPage,
            applications: applications,
        },
    });
});
export const getAJobApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }

    const candidateId = req.body.user_id;
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return next(new AppError("Invalid candidate ID", StatusCodes.BAD_REQUEST));
    }

    const application = await Application.findOne({ job_id: jobId, candidate_id: candidateId })
        .populate("job_id")
        .populate("candidate_id");
    if (!application) {
        return next(new AppError("Application not found", StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application: application,
        },
    });
});

export const getJobsByCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.companyId;
    isObjectIdOfMongoDB(companyId, "companyId", `Company Id ${companyId} in params is not a valid MongoDB ObjectId`);

    const jobs = await Job.find({ company_id: companyId });

    const jobsFilter = jobs.map((job: any) => {
        return {
            _id: job._id,
            title: job.title,
            salary_range: job.salary_range.min + " - " + job.salary_range.max + " " + job.salary_unit || null,
            job_category: job?.job_category?.name || null,
            job_type: job?.job_type?.name || null,
            address: job.address || null,
            description: job.description || null,
            benefits: job.benefits || null,
            skills: job.skills || null,
            requirements: job.requirements || null,
            views: job.views || null,
            applications_count: job.applications_count || null,
            posted_at: job.posted_at || null,
            expires_at: job.expires_at || null,
            employer_id: job.employer_id || null,
            company: job?.company_id?.name || null,
            image: job?.image || null,
            status: job?.status || null,
            is_public: job.is_public || null,
        };
    });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: jobs.length,
            jobs: jobsFilter,
        },
    });
});

export const createApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    const candidate = req.body.user;
    const candidateId = candidate._id;

    const { full_name, email, phone, skills, worker_experience, certification, cover_letter, cv } = req.body;

    isRequired(full_name, "full_name");
    isRequired(email, "email");
    isRequired(phone, "phone");
    isRequired(skills, "skills");
    isRequired(worker_experience, "worker_experience");
    isRequired(certification, "certification");

    const existingApplication = await Application.findOne({ job_id: jobId, candidate_id: candidateId });
    if (existingApplication) {
        const updatedApplication = await existingApplication.updateOne({
            full_name: full_name,
            email: email,
            phone: phone,
            skills: skills,
            worker_experience: worker_experience,
            certification: certification,
            cover_letter: cover_letter,
            cv: cv || null,
            status: "pending",
            applied_at: new Date(),
        });

        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                application: updatedApplication,
            },
        });
    } else {
        const job = await Job.findById(jobId);
        if (job) {
            if (job.applications_count) {
                job.applications_count += 1;
            } else {
                job.applications_count = 1;
            }
            await job.save();
        }
        const application = await Application.create({
            job_id: jobId,
            candidate_id: candidateId,
            full_name: full_name,
            email: email,
            phone: phone,
            skills: skills,
            worker_experience: worker_experience,
            certification: certification,
            cover_letter: cover_letter,
            cv: cv || null,
            status: "pending",
            applied_at: new Date(),
        });

        res.status(StatusCodes.CREATED).json({
            status: "success",
            data: {
                application: application,
            },
        });
    }
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

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application: null,
        },
    });
});

export const responseToJobApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new AppError("Invalid job ID", StatusCodes.BAD_REQUEST));
    }

    const candidateId = req.body.user_id;
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return next(new AppError("Invalid candidate ID", StatusCodes.BAD_REQUEST));
    }

    const application = await Application.findOne({ job_id: jobId, candidate_id: candidateId });
    if (!application) {
        return next(new AppError("Application not found", StatusCodes.NOT_FOUND));
    }

    const response = req.params.response;
    if (!response) {
        return next(new AppError("Response is required", StatusCodes.BAD_REQUEST));
    }

    const responsedApplication = await Application.findOneAndUpdate({ _id: application._id }, { status: response });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            application: responsedApplication,
        },
    });
});

export const getJobListingsByEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { status, page, limit } = req.query;

    const employerProfile = await EmployerProfile.findById(user.profile_id);
    isNotFound(employerProfile, "Employer", `Employer with id ${user.profile_id} not found`);

    const company = await Company.findById(employerProfile?.company_id);
    isNotFound(company, "Company", `Company with id ${employerProfile?.company_id} not found`);

    const filter: any = { employer_id: user._id };
    const validStatus = ["pending", "approved", "rejected"];
    if (status && validStatus.includes(status as string)) filter.status = status;

    let jobsQuery = Job.find(filter)
        .populate("company_id")
        .populate("employer_id")
        .populate("job_type")
        .populate("job_category");

    if (page && limit) {
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        jobsQuery = jobsQuery.skip(skip).limit(limitNum);
    }

    const jobs = await jobsQuery;

    const totalJobs = page && limit ? await Job.countDocuments(filter) : jobs.length;

    const jobsFilter = jobs.map((job: any) => {
        return {
            _id: job?._id,
            title: job?.title,
            salary_range: job?.salary_range.min + " - " + job?.salary_range.max + " " + job?.salary_unit || null,
            job_category: job?.job_category?.name || null,
            job_type: job?.job_type?.name || null,
            address: job?.address || null,
            description: job?.description || null,
            benefits: job?.benefits || null,
            skills: job?.skills || null,
            requirements: job?.requirements || null,
            views: job?.views || null,
            applications_count: job?.applications_count || null,
            posted_at: job?.posted_at || null,
            expires_at: job?.expires_at || null,
            employer_id: job?.employer_id || null,
            company: job?.company_id?.name || null,
            image: job?.image || null,
            status: job?.status || null,
            is_public: job?.is_public || null,
        };
    });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: totalJobs,
            pagination:
                page && limit
                    ? {
                          totalJobs,
                          totalPages: Math.ceil(totalJobs / parseInt(limit as string, 10)),
                          currentPage: parseInt(page as string, 10),
                      }
                    : undefined,
            jobs: jobsFilter,
        },
    });
});

export const createJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    // check if company's employer not exists
    const employer = await EmployerProfile.findById(user.profile_id);
    isNotFound(employer, "Employer", `Employer with id ${user.profile_id} not found`);
    const company = await Company.findById(employer?.company_id);
    isNotFound(company, "Company", `Company with id ${employer?.company_id} not found`);

    const {
        title,
        min_salary,
        max_salary,
        salary_unit,
        address,
        description,
        skills,
        requirements,
        benefits,
        expires_at,
        job_type,
        job_category,
        is_public,
    } = req.body;
    const salary_range = { min: min_salary, max: max_salary };

    isRequired(title, "title");
    isRequired(min_salary, "min_salary");
    isRequired(max_salary, "max_salary");
    isRequired(salary_unit, "salary_unit");
    isRequired(address, "address");
    isRequired(skills, "skills");
    isRequired(requirements, "requirements");
    isRequired(benefits, "benefits");
    isRequired(expires_at, "expires_at");
    isRequired(job_type, "job_type");
    isRequired(job_category, "job_category");

    // check if job type and job category exists in database and create if not
    let existing_job_type = await JobType.findOne({ name: job_type });
    if (!existing_job_type) {
        existing_job_type = await JobType.create({ name: job_type });
    }
    let existing_job_category = await JobCategory.findOne({ name: job_category });
    if (!existing_job_category) {
        existing_job_category = await JobCategory.create({ name: job_category });
    }

    const job_fields = {
        title: title,
        company_id: company?._id,
        employer_id: user?._id,
        salary_range: salary_range,
        salary_unit: salary_unit,
        address: address,
        description: description,
        skills: skills,
        requirements: requirements,
        benefits: benefits,
        expires_at: expires_at,
        job_type: existing_job_type?._id,
        job_category: existing_job_category?._id,
        is_public: is_public,
        posted_at: new Date(),
    };

    const job = await Job.create(job_fields);

    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            job: job,
        },
    });
});

export const getAllJobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 0;

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
    const jobs = await Job.find()
        .skip(skip)
        .limit(limit)
        .populate("company_id")
        .populate("employer_id")
        .populate("job_type")
        .populate("job_category");

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_jobs: totalJobs,
            max_page: maxPage,
            jobs: jobs,
        },
    });
});

export const updateJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const jobId = req.params.jobId;
    isObjectIdOfMongoDB(jobId, "JobId", `Job Id ${jobId} is not a valid MongoDB ObjectId`);

    const employer = await EmployerProfile.findById(user.profile_id);
    isNotFound(employer, "Employer", `Employer with id ${user.profile_id} not found`);

    const existingJob = await Job.findOne({ _id: jobId, employer_id: user._id, company_id: employer?.company_id });
    isNotFound(existingJob, "Job", `Job with id ${jobId} not found`);


    const company = await Company.findById(employer?.company_id);
    isNotFound(company, "Company", `Company with id ${employer?.company_id} not found`);

    const {
        title,
        min_salary,
        max_salary,
        salary_unit,
        address,
        description,
        skills,
        requirements,
        benefits,
        expires_at,
        job_type,
        job_category,
        is_public,
    } = req.body;
    const salary_range = { min: min_salary, max: max_salary };

    isRequired(title, "title");
    isRequired(min_salary, "min_salary");
    isRequired(max_salary, "max_salary");
    isRequired(salary_unit, "salary_unit");
    isRequired(address, "address");
    isRequired(skills, "skills");
    isRequired(requirements, "requirements");
    isRequired(benefits, "benefits");
    isRequired(expires_at, "expires_at");
    isRequired(job_type, "job_type");
    isRequired(job_category, "job_category");

    // check if job type and job category exists in database and create if not
    let existing_job_type = await JobType.findOne({ name: job_type });
    if (!existing_job_type) {
        existing_job_type = await JobType.create({ name: job_type });
    }
    let existing_job_category = await JobCategory.findOne({ name: job_category });
    if (!existing_job_category) {
        existing_job_category = await JobCategory.create({ name: job_category });
    }

    const job_fields = {
        title: title,
        company_id: company?._id,
        employer_id: user?._id,
        salary_range: salary_range,
        salary_unit: salary_unit,
        address: address,
        description: description,
        skills: skills,
        requirements: requirements,
        benefits: benefits,
        expires_at: expires_at,
        job_type: existing_job_type?._id,
        job_category: existing_job_category?._id,
        is_public: is_public,
    };

    await existingJob?.updateOne(job_fields);

    const updatedJob = await Job.findById(jobId);

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            job: updatedJob,
        },
    });
});

export const deleteJob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    isObjectIdOfMongoDB(jobId, "JobId", `Job Id ${jobId} is not a valid MongoDB ObjectId`);

    const job = await Job.findById(jobId);
    isNotFound(job, "Job", `Job with id ${jobId} not found`);

    await Job.deleteOne({ _id: jobId });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            job: null,
        },
    });
});

export const getAJobById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.jobId;
    isObjectIdOfMongoDB(jobId, "JobId", "Job Id in params is not valid");

    const job = (await Job.findOne({ _id: jobId })
        .populate("company_id")
        .populate({
            path: "employer_id",
            populate: {
                path: "profile_id",
            }
        })
        .populate("job_type")
        .populate("job_category")) as any;

    if (!job) {
        return next(new AppError(`Job with id ${jobId} not found`, StatusCodes.NOT_FOUND));
    }

    const jobFilter = {
        _id: job?._id,
        title: job?.title,
        salary_range: job?.salary_range.min + " - " + job?.salary_range.max + " " + job?.salary_unit || null,
        job_category: job?.job_category?.name || null,
        job_type: job?.job_type?.name || null,
        address: job?.address || null,
        description: job?.description || null,
        benefits: job?.benefits || null,
        skills: job?.skills || null,
        requirements: job?.requirements || null,
        is_public: job?.is_public || null,
        views: job?.views || null,
        applications_count: job?.applications_count || null,
        posted_at: job?.posted_at || null,
        expires_at: job?.expires_at || null,
        employer_id: {
            _id: job?.employer_id?._id,
            full_name: job?.employer_id?.profile_id?.full_name || null,
            contact_email: job?.employer_id?.profile_id?.contact_email || null,
            email: job?.employer_id?.profile_id?.email || null,
            phone: job?.employer_id?.profile_id?.phone || null,
            address: job?.employer_id?.profile_id?.address || null,
            avatar: job?.employer_id?.profile_id?.avatar || null,
            introduction: job?.employer_id?.profile_id?.introduction || null,
            company_role: job?.employer_id?.profile_id?.company_role || null,
        },
        company: {
            name: job?.company_id?.name || null,
            logo: job?.company_id?.avatar || null,
            website: job?.company_id?.website || null,
            size: job?.company_id?.size || null,
            industry: job?.company_id?.industry || null,
            introduction: job?.company_id?.introduction || null,
        },
    };

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            job: jobFilter,
        },
    });
});

export const getJobTypeList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobTypes = await JobType.find();

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_job_types: jobTypes.length,
            job_types: jobTypes,
        },
    });
});

export const getJobCategoryList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jobCategories = await JobCategory.find();

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_job_categories: jobCategories.length,
            job_categories: jobCategories,
        },
    });
});

export const getJobLocationList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const addressList = await Job.find().distinct("address");

    const jobLocations = addressList.map((address: string) => {
        return address.split(",")[address.split(",").length - 1].trim();
    });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_job_locations: jobLocations.length,
            job_locations: jobLocations,
        },
    });
})