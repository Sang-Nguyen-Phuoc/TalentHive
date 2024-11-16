import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import Company from "../models/company";

const getAllCompanies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companies = await Company.find().populate("company_manager");
        res.status(200).json({
            status: "success",
            data: {
                companies,
            },
        });
    } catch(err) {
        return next(new AppError("Database error", 500));  
    }
});

export { 
    getAllCompanies 
};