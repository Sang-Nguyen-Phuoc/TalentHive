import statusCodes, { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import CandidateProfile from "../models/candidateProfile";
import { isNotFound, isObjectIdOfMongoDB } from "../utils/validateServices";

export const getAllCandidates = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await CandidateProfile.find().populate("user_id");
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            candidates,
        },
    });
});

export const getCandidate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    isObjectIdOfMongoDB(id, "id", `Invalid id: ${id} in params`);
    const resultRecord = (await User.findById(id).populate("profile_id")) as any;
    isNotFound(resultRecord, "", `User not found with the provided id: ${id}`);

    const userFiltered = {
        _id: resultRecord?._id,
        contact_email: resultRecord?.profile_id?.contact_email || null,
        role: resultRecord?.role || null,
        full_name: resultRecord?.profile_id?.full_name || null,
        avatar: resultRecord?.profile_id?.avatar || null,
        date_of_birth: resultRecord?.profile_id?.date_of_birth || null,
        gender: resultRecord?.profile_id?.gender || null,
        phone: resultRecord?.profile_id?.phone || null,
        address: resultRecord?.profile_id?.address || null,
        city: resultRecord?.profile_id?.city || null,
        introduction: resultRecord?.profile_id?.introduction || null,
        skills: resultRecord?.profile_id?.skills || null,
        certification: resultRecord?.profile_id?.certification || null,
        experience: resultRecord?.profile_id?.experience || null,
        work_experience: resultRecord?.profile_id?.work_experience || null,
    };
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: userFiltered,
        },
    });
});

export const updateCandidateInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    if (!user?.profile_id) {
        return next(new AppError("User profile not found", statusCodes.NOT_FOUND));
    }

    const candidateProfile = await CandidateProfile.findById(user?.profile_id);
    isNotFound(candidateProfile, "", `Profile with id: ${user?.profile_id} not found`);

    const {
        full_name,
        contact_email,
        date_of_birth,
        gender,
        phone,
        address,
        city,
        skills,
        certification,
        work_experience,
        introduction,
        avatar,
    } = req.body;

    const updatedCandidateProfile = await candidateProfile?.updateOne({
        full_name: full_name || candidateProfile?.full_name || null,
        contact_email: contact_email || candidateProfile?.contact_email || null,
        introduction: introduction || candidateProfile?.introduction || null,
        date_of_birth: date_of_birth || candidateProfile?.date_of_birth || null,
        gender: gender || candidateProfile?.gender || null,
        phone: phone || candidateProfile?.phone || null,
        address: address || candidateProfile?.address || null,
        city: city || candidateProfile?.city || null,
        skills: skills || candidateProfile?.skills || null,
        certification: certification || candidateProfile?.certification || null,
        work_experience: work_experience || candidateProfile?.work_experience || null,
        avatar: avatar || candidateProfile?.avatar || null,
    });

    const updatedUser = await CandidateProfile.findById(candidateProfile!._id);

    res.status(statusCodes.OK).json({
        status: "success",
        data: {
            candidate: updatedUser,
        },
    });
});
