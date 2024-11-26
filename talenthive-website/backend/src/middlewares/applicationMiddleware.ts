import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { StatusCodes } from "http-status-codes";


export const validateApplicationFields = (req: Request, res: Response, next: NextFunction) => {
    const { full_name, resume, email, cover_letter, phone } = req.body;
    if (full_name && typeof full_name !== "string") {
        return next(new AppError("Full name must be a string", StatusCodes.BAD_REQUEST));
    }
    if (resume && typeof resume !== "object") {
        return next(new AppError("Resume must be an object", StatusCodes.BAD_REQUEST));
    }
    if (email && !validator.isEmail(email)) {
        return next(new AppError("Invalid email address", StatusCodes.BAD_REQUEST));
    }
    if (cover_letter && typeof cover_letter !== "string") {
        return next(new AppError("Cover letter must be a string", StatusCodes.BAD_REQUEST));
    }
    if (phone && !validator.isMobilePhone(phone)) {
        return next(new AppError("Invalid phone number", StatusCodes.BAD_REQUEST));
    }
    next(); 
};

export const validateMissingApplicationFields = async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, resume, email, cover_letter, phone } = req.body;
    if (!full_name) {
        return next(new AppError("Full name is required", StatusCodes.BAD_REQUEST));
    }
    if (!resume) {
        return next(new AppError("Resume is required", StatusCodes.BAD_REQUEST));
    }
    if (!email) {
        return next(new AppError("Email is required", StatusCodes.BAD_REQUEST));
    }
    if (!cover_letter) {
        return next(new AppError("Cover letter is required", StatusCodes.BAD_REQUEST));
    }
    if (!phone) {
        return next(new AppError("Phone number is required", StatusCodes.BAD_REQUEST));
    }
    next();
}