import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import Company from "../models/company";

export const getAllCompanies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.find().populate("company_manager");
    res.status(200).json({
        status: "success",
        data: {
            companies,
        },
    });
});