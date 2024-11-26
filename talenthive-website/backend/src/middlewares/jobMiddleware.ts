import { Request, Response, NextFunction } from 'express';
import Job from '../models/job';
import AppError from '../utils/appError';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import JobType from '../models/jobType';
import JobCategory from '../models/jobCategory';

export const validateJobFields = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let {
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
    } = req.method === 'GET' ? req.query : req.body; // For GET requests, use query parameters

    if (skills) {
        if (!Array.isArray(skills)) {
            skills = [skills];
        }
    }

    if (req.method === 'PUT') {
        if (!title && !company_id && !employer_id && !salary_range && !location && !description && !skills && !requirements && !benefits && !expires_at && !job_type && !job_category && !is_public) {
            return next(new AppError('At least one field is required', 400));
        }
    }

    // Validate individual fields
    if (title && typeof title !== 'string') {
        return next(new AppError('title must be a string', 400));
    }

    if (company_id && !mongoose.Types.ObjectId.isValid(company_id)) {
        return next(new AppError('company_id is not valid', 400));
    }

    if (employer_id && !mongoose.Types.ObjectId.isValid(employer_id)) {
        return next(new AppError('employer_id is not valid', 400));
    }

    if (req.method === "GET" && salary_range) {
        const rangeParts = salary_range.split('-');
        if (rangeParts.length === 2) {
            const min = Number(rangeParts[0]);
            const max = Number(rangeParts[1]);

            if (isNaN(min) || isNaN(max)) {
                return next(new AppError('salary_range must be an object with min and max as numbers', 400));
            }

            if (min > max) {
                return next(new AppError('min salary cannot be greater than max salary', 400));
            }

        } else {
            return next(new AppError('salary_range must be in the format min-max', 400));
        }
        
    } else if (salary_range && (typeof salary_range !== 'object' || typeof salary_range.min !== 'number' || typeof salary_range.max !== 'number')) {
        return next(new AppError('salary_range must be an object with min and max as numbers', 400));
    }

    if (location && typeof location !== 'string') {
        return next(new AppError('location must be a string', 400));
    }

    if (description && typeof description !== 'string') {
        return next(new AppError('description must be a string', 400));
    }

    if (skills && (!Array.isArray(skills) || !skills.every((skill) => typeof skill === 'string'))) {
        return next(new AppError('skills must be an array of strings', 400));
    }

    if (job_type && !mongoose.Types.ObjectId.isValid(job_type)) {
        return next(new AppError('job_type is not valid', 400));
    }

    if (job_type && !await JobType.exists({ _id: job_type })) {
        return next(new AppError('job_type does not exist', 400));
    }

    if (job_category && !mongoose.Types.ObjectId.isValid(job_category)) {
        return next(new AppError('job_category is not valid', 400));
    }
    
    if (job_category && !await JobCategory.exists({ _id: job_category })) {
        return next(new AppError('job_category does not exist', 400));
    }

    if (is_public && typeof is_public !== 'boolean') {
        return next(new AppError('is_public must be a boolean', 400));
    }

    next();
});

export const trimJobFields = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        req.query = Object.fromEntries(Object.entries(req.query).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    }
    else {
        req.body = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    }
    next();
});

export const validateMissingJobFields = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let {
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
        is_public
    } = req.method === 'GET' ? req.query : req.body; // For GET requests, use query parameters

    if (!title)
        return next(new AppError('title is required', 400));
    if (!company_id)
        return next(new AppError('company_id is required', 400));
    if (!employer_id)
        return next(new AppError('employer_id is required', 400));
    if (!salary_range)
        return next(new AppError('salary_range is required', 400));
    if (!location)
        return next(new AppError('location is required', 400));
    if (!description)
        return next(new AppError('description is required', 400));
    if (!skills)
        return next(new AppError('skills is required', 400));
    if (!requirements)
        return next(new AppError('requirements is required', 400));
    if (!benefits)
        return next(new AppError('benefits is required', 400));
    if (!expires_at)
        return next(new AppError('expires_at is required', 400));
    if (!job_type)
        return next(new AppError('job_type is required', 400));
    if (!job_category)
        return next(new AppError('job_category is required', 400));
    if (!is_public)
        return next(new AppError('is_public is required', 400));
    next();
});