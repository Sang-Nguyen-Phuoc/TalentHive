import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import JobType from '../models/jobType';
import JobCategory from '../models/jobCategory';
import { StatusCodes } from 'http-status-codes';

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
            return next(new AppError('At least one field is required', StatusCodes.BAD_REQUEST));
        }
    }

    // Validate individual fields
    if (title && typeof title !== 'string') {
        return next(new AppError('title must be a string', StatusCodes.BAD_REQUEST));
    }

    if (company_id && !mongoose.Types.ObjectId.isValid(company_id)) {
        return next(new AppError('company_id is not valid', StatusCodes.BAD_REQUEST));
    }

    if (employer_id && !mongoose.Types.ObjectId.isValid(employer_id)) {
        return next(new AppError('employer_id is not valid', StatusCodes.BAD_REQUEST));
    }

    if (req.method === "GET" && salary_range) {
        const rangeParts = salary_range.split('-');
        if (rangeParts.length === 2) {
            const min = Number(rangeParts[0]);
            const max = Number(rangeParts[1]);

            if (isNaN(min) || isNaN(max)) {
                return next(new AppError('salary_range must be an object with min and max as numbers', StatusCodes.BAD_REQUEST));
            }

            if (min > max) {
                return next(new AppError('min salary cannot be greater than max salary', StatusCodes.BAD_REQUEST));
            }

        } else {
            return next(new AppError('salary_range must be in the format min-max', StatusCodes.BAD_REQUEST));
        }
        
    } else if (salary_range && (typeof salary_range !== 'object' || typeof salary_range.min !== 'number' || typeof salary_range.max !== 'number')) {
        return next(new AppError('salary_range must be an object with min and max as numbers', StatusCodes.BAD_REQUEST));
    }

    if (location && typeof location !== 'string') {
        return next(new AppError('location must be a string', StatusCodes.BAD_REQUEST));
    }

    if (description && typeof description !== 'string') {
        return next(new AppError('description must be a string', StatusCodes.BAD_REQUEST));
    }

    if (skills && (!Array.isArray(skills) || !skills.every((skill) => typeof skill === 'string'))) {
        return next(new AppError('skills must be an array of strings', StatusCodes.BAD_REQUEST));
    }

    if (job_type && !mongoose.Types.ObjectId.isValid(job_type)) {
        return next(new AppError('job_type is not valid', StatusCodes.BAD_REQUEST));
    }

    if (job_type && !await JobType.exists({ _id: job_type })) {
        return next(new AppError('job_type does not exist', StatusCodes.BAD_REQUEST));
    }

    if (job_category && !mongoose.Types.ObjectId.isValid(job_category)) {
        return next(new AppError('job_category is not valid', StatusCodes.BAD_REQUEST));
    }
    
    if (job_category && !await JobCategory.exists({ _id: job_category })) {
        return next(new AppError('job_category does not exist', StatusCodes.BAD_REQUEST));
    }

    if (is_public && typeof is_public !== 'boolean') {
        return next(new AppError('is_public must be a boolean', StatusCodes.BAD_REQUEST));
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
        return next(new AppError('title is required', StatusCodes.BAD_REQUEST));
    if (!company_id)
        return next(new AppError('company_id is required', StatusCodes.BAD_REQUEST));
    if (!employer_id)
        return next(new AppError('employer_id is required', StatusCodes.BAD_REQUEST));
    if (!salary_range)
        return next(new AppError('salary_range is required', StatusCodes.BAD_REQUEST));
    if (!location)
        return next(new AppError('location is required', StatusCodes.BAD_REQUEST));
    if (!description)
        return next(new AppError('description is required', StatusCodes.BAD_REQUEST));
    if (!skills)
        return next(new AppError('skills is required', StatusCodes.BAD_REQUEST));
    if (!requirements)
        return next(new AppError('requirements is required', StatusCodes.BAD_REQUEST));
    if (!benefits)
        return next(new AppError('benefits is required', StatusCodes.BAD_REQUEST));
    if (!expires_at)
        return next(new AppError('expires_at is required', StatusCodes.BAD_REQUEST));
    if (!job_type)
        return next(new AppError('job_type is required', StatusCodes.BAD_REQUEST));
    if (!job_category)
        return next(new AppError('job_category is required', StatusCodes.BAD_REQUEST));
    if (!is_public)
        return next(new AppError('is_public is required', StatusCodes.BAD_REQUEST));
    next();
});