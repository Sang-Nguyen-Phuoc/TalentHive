import EmployerProfile from "../models/employerProfile";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import User from "../models/user";

export const getAllEmployers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const employers = await EmployerProfile.find().populate("user_id");
        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                employers,
            },
        });
    }
);

export const updateEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        full_name,
        avatar,
        introduction,
        address,
        email,
        phone,
        category
    } = req.body;

    let employer: any;
    try {
        employer = await EmployerProfile.findOne({ user_id: req.body.userId });
    } catch(err) {
        return next(new AppError("Database error occurred. Please try again", 500));
    }
  
  
    if (!employer) {
        return next(new AppError("Employer not found", 404));
    }

    // check if at least one field is provided
    if (!full_name && !avatar && !introduction && !address && !email && !phone && !category) {
        return next(new AppError("At least one field is required", 400));
    }

    if (full_name) {
        if (typeof full_name !== "string") {
            return next(new AppError("Full name must be a string", 400));
        }
       
        // if full_name contains non-alphabetic characters
        if (!/^[a-zA-Z ]+$/.test(full_name)) {
            return next(new AppError("Full name must contain only alphabetic characters", 400));
        }
    }

    if (avatar && typeof avatar !== "object") {
        return next(new AppError("Avatar must be an object", 400));
    }

    if (introduction && typeof introduction !== "string") {
        return next(new AppError("Introduction must be a string", 400));
    }

    if (address && typeof address !== "string") {
        return next(new AppError("Address must be a string", 400));
    }

    if (email && !validator.isEmail(email)) {
        return next(new AppError("Invalid email address", 400));
    }

    if (phone && !validator.isMobilePhone(phone)) {
        return next(new AppError("Invalid phone number", 400));
    }

    if (category && typeof category !== "string") {
        return next(new AppError("category must be a string", 400));
    }


    // just update the fields that are provided
    const updatedEmployer = await EmployerProfile.findOneAndUpdate(
        { user_id: req.body.userId },
        {
            full_name: full_name || employer.full_name,
            avatar: avatar || employer.avatar,
            introduction: introduction || employer.introduction,
            address: address || employer.address,
            email: email || employer.email,
            phone: phone || employer.phone,
            category: category || employer.category
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            employer: updatedEmployer
        }
    });
});

export const deleteEmployerById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {employerId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
        return next(new AppError("Invalid ID", StatusCodes.BAD_REQUEST));
    }

    const employerProfile = await EmployerProfile.findOne({ _id: employerId });
    if (!employerProfile)
        return next(new AppError(`Employer profile with id: ${employerId} not found`, StatusCodes.NOT_FOUND));

    const user = await User.findOne({ _id: employerProfile.user_id });
    if (!user)
        return next(new AppError(`User with id: ${employerProfile.user_id} not found`, StatusCodes.NOT_FOUND));

    await employerProfile.updateOne({ active: false });
    await user.updateOne({ active: false });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: null
        }
    })
})