import mongoose from "mongoose";
import statusCodes, { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import validator from "validator";

import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import CandidateProfile from "../models/candidateProfile";

export const getAllCandidates = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await CandidateProfile.find().populate("user_id");
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            candidates,
        },
    });
});

export const deleteUserByCandidateId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError("Invalid ID", statusCodes.BAD_REQUEST));
        }
        const candidateProfile = await CandidateProfile.findById(id);
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

export const updateCandidateInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        full_name,
        email,
        date_of_birth,
        gender,
        phone_number,
        address,
        city,
        education,
        skills,
        certifications,
        experience,
        work_experience,
        resume,
        avatar
    } = req.body;

    let candidate: any;
    try {
        candidate = await CandidateProfile.findOne({user_id: req.body.userId});
    } catch (err) {
        return next(new AppError("Database error occurred. Please try again", statusCodes.INTERNAL_SERVER_ERROR));
    }
    if (!candidate) {
        return next(new AppError("Candidate not found", statusCodes.NOT_FOUND));
    }

    if (!full_name && !email && !date_of_birth && !gender && !phone_number && !address && !city && !education && !skills && !certifications && !experience && !work_experience && !resume && !avatar) {
        return next(new AppError("At least one field is required", statusCodes.BAD_REQUEST));
    }
    
    if (full_name) {
        if (typeof full_name !== "string") {
            return next(new AppError("Full name must be a string", statusCodes.BAD_REQUEST));
        }
       
        // if full_name contains non-alphabetic characters
        if (!/^[a-zA-Z ]+$/.test(full_name)) {
            return next(new AppError("Full name must contain only alphabetic characters", statusCodes.BAD_REQUEST));
        }
    }
    if (email && !validator.isEmail(email)) {
        return next(new AppError("Invalid email address", statusCodes.BAD_REQUEST));
    }
    if (date_of_birth && !validator.isDate(date_of_birth)) {
        return next(new AppError("Invalid date of birth", statusCodes.BAD_REQUEST));
    }
    if (phone_number && !validator.isMobilePhone(phone_number)) {
        return next(new AppError("Invalid phone number", statusCodes.BAD_REQUEST));
    }
    if (address && typeof address !== "string") {
        return next(new AppError("Address must be a string", statusCodes.BAD_REQUEST));
    }
    if (city && typeof city !== "string") {
        return next(new AppError("City must be a string", statusCodes.BAD_REQUEST));
    }
    if (education && typeof education !== "string") {
        return next(new AppError("Education must be a string", statusCodes.BAD_REQUEST));
    }
    if (skills && !Array.isArray(skills)) {
        return next(new AppError("Skills must be an array of string", statusCodes.BAD_REQUEST));
    }
    if (certifications && !Array.isArray(certifications)) {
        return next(new AppError("Certifications must be an array of string", statusCodes.BAD_REQUEST));
    }
    if (experience && typeof experience !== "string") {
        return next(new AppError("Experience must be a string", statusCodes.BAD_REQUEST));
    }
    if (work_experience && typeof work_experience !== "string") {
        return next(new AppError("Work experience must be a string", statusCodes.BAD_REQUEST));
    }
    if (resume && typeof resume !== "object") {
        return next(new AppError("Resume must be an object", statusCodes.BAD_REQUEST));
    }    
    if (avatar && typeof avatar !== "object") {
        return next(new AppError("Avatar must be an object", statusCodes.BAD_REQUEST));
    }

    const updateCandidateInfo = await CandidateProfile.findOneAndUpdate(
        { user_id: req.body.userId },
        {
            full_name,
            email,
            date_of_birth,
            gender,
            phone_number,
            address,
            city,
            education,
            skills,
            certifications,
            experience,
            work_experience,
            resume,
            avatar
        },
        { new: true }
    );

    res.status(statusCodes.OK).json({
        status: "success",
        data: {
            candidate: updateCandidateInfo
        }
    })
})
