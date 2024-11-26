import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import EmployerProfile from "../models/employerProfile";
import CandidateProfile from "../models/candidateProfile";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";
import { StatusCodes } from "http-status-codes";

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
        return next(new AppError("Please provide an email", StatusCodes.BAD_REQUEST));
    }

    if (!validator.isEmail(req.body.email)) {
        return next(new AppError("Please provide a valid email", StatusCodes.BAD_REQUEST));
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return next(new AppError("User not found", StatusCodes.NOT_FOUND));
    }

    // soft delete by setting active to false
    await User.updateOne({email: req.body.email}, { $set: { active: false } });
    if (user.role === 'employer') {
        await EmployerProfile.updateOne({user_id: user._id}, { $set: { active: false } });
    } else if (user.role === 'candidate') {
        await CandidateProfile.updateOne({user_id: user._id}, { $set: { active: false } });
    }

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: null
    });
});