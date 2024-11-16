import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import Company from "../models/company";

export const getACompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.companyId;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return next(new AppError("Invalid company ID", 400));
    }
    
    const company = await Company.findOne({ _id: companyId }).populate("name")
                                                            .populate("admin_approved")
                                                            .populate("company_manager");

    if (!company) {
        return next(new AppError("Company ID not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            "company": company
        }
    });
});