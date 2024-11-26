import AppError from "../utils/appError";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import catchAsync from "../utils/catchAsync";

export const validateApplicationFields = (req: Request, res: Response, next: NextFunction) => {
    const { full_name, resume, email, cover_letter, phone } = req.body;
    if (full_name && typeof full_name !== "string") {
        return next(new AppError("Full name must be a string", 400));
    }
    if (resume && typeof resume !== "object") {
        return next(new AppError("Resume must be an object", 400));
    }
    if (email && !validator.isEmail(email)) {
        return next(new AppError("Invalid email address", 400));
    }
    if (cover_letter && typeof cover_letter !== "string") {
        return next(new AppError("Cover letter must be a string", 400));
    }
    if (phone && !validator.isMobilePhone(phone)) {
        return next(new AppError("Invalid phone number", 400));
    }
    next(); 
};

export const validateMissingApplicationFields = async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, resume, email, cover_letter, phone } = req.body;
    if (!full_name) {
        return next(new AppError("Full name is required", 400));
    }
    if (!resume) {
        return next(new AppError("Resume is required", 400));
    }
    if (!email) {
        return next(new AppError("Email is required", 400));
    }
    if (!cover_letter) {
        return next(new AppError("Cover letter is required", 400));
    }
    if (!phone) {
        return next(new AppError("Phone number is required", 400));
    }
    next();
}