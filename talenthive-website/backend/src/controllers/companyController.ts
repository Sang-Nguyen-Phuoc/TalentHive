import mongoose from "mongoose";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import Company from "../models/company";
import Image from "../models/image";
import EmployerProfile from "../models/employerProfile";

export const getAllCompanies = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const companies = await Company.find().populate("company_manager").populate("avatar");
        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                companies,
            },
        });
    }
);

export const createCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, locations, industry, address, website, company_manager } = req.body;

    if (!name) {
        return next(new AppError("name is required", StatusCodes.BAD_REQUEST));
    }
    if (!locations) {
        return next(new AppError("locations is required", StatusCodes.BAD_REQUEST));
    }
    if (!industry) {
        return next(new AppError("industry is required", StatusCodes.BAD_REQUEST));
    }
    if (!address) {
        return next(new AppError("address is required", StatusCodes.BAD_REQUEST));
    }
    if (!company_manager) {
        return next(new AppError("company_manager is required", StatusCodes.BAD_REQUEST));
    }

    if (
        locations &&
        (!Array.isArray(locations) || !locations.every((location) => typeof location === "string"))
    ) {
        return next(new AppError("locations must be an array of strings", StatusCodes.BAD_REQUEST));
    }
    if (website && typeof website !== "string") {
        return next(new AppError("website must be a string", StatusCodes.BAD_REQUEST));
    }
    if (website && !validator.isURL(website)) {
        return next(new AppError("Invalid website URL", StatusCodes.BAD_REQUEST));
    }

    if (
        !mongoose.Types.ObjectId.isValid(company_manager) ||
        !(await EmployerProfile.findById(company_manager))
    ) {
        return next(new AppError("Invalid company_manager ID", StatusCodes.BAD_REQUEST));
    }

    let company;

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        if (req.files.length > 1) {
            return next(new AppError("Only one file is allowed", StatusCodes.BAD_REQUEST));
        }
        const avatar = req.files[0];
        if (avatar.fieldname !== "avatar") {
            return next(new AppError("fieldname must be avatar", StatusCodes.BAD_REQUEST));
        }
        if (!avatar.mimetype.startsWith("image")) {
            return next(new AppError("Only image files are allowed", StatusCodes.BAD_REQUEST));
        }

        const fileExtension = avatar.originalname.split(".").pop();
        if (!/\.(jpg|jpeg|png)$/.test(`.${fileExtension}`)) {
            return next(
                new AppError("Only jpg, jpeg and png files are allowed", StatusCodes.BAD_REQUEST)
            );
        }
        if (avatar.size > 1024 * 1024) {
            return next(new AppError("File size must not exceed 1MB", StatusCodes.BAD_REQUEST));
        }

        const image = await Image.create({
            originalname: avatar.originalname,
            contentType: avatar.mimetype,
            data: avatar.buffer,
        });

        company = await Company.create({
            name,
            locations,
            industry,
            address,
            website,
            avatar: image._id,
            company_manager,
        });
    } else {
        company = await Company.create({
            name,
            locations,
            industry,
            address,
            website,
            company_manager,
        });
    }

    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            company,
        },
    });
});

export const deleteCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid ID", StatusCodes.BAD_REQUEST));
    }

    const company = await Company.findById(id);
    if (!company) {
        return next(new AppError(`Company with id: ${id} not found`, StatusCodes.NOT_FOUND));
    }

    if (company.avatar) {
        await Image.findByIdAndDelete(company.avatar);
    }

    await company.deleteOne();

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: null,
        },
    });
});

export const updateCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid ID", StatusCodes.BAD_REQUEST));
    }

    const company = await Company.findById(id);
    if (!company) {
        return next(new AppError(`Company with id: ${id} not found`, StatusCodes.NOT_FOUND));
    }

    const { name, locations, industry, address, website, company_manager } = req.body;

    if (name) {
        company.name = name;
    }
    if (locations) {
        if (
            !Array.isArray(locations) ||
            !locations.every((location) => typeof location === "string")
        ) {
            return next(
                new AppError("locations must be an array of strings", StatusCodes.BAD_REQUEST)
            );
        }
        if (locations.length === 0) {
            return next(
                new AppError("locations must have at least one location", StatusCodes.BAD_REQUEST)
            );
        }
        company.locations = locations;
    }
    if (industry) {
        company.industry = industry;
    }
    if (address) {
        company.address = address;
    }
    if (website) {
        if (typeof website !== "string") {
            return next(new AppError("website must be a string", StatusCodes.BAD_REQUEST));
        }
        if (!validator.isURL(website)) {
            return next(new AppError("Invalid website URL", StatusCodes.BAD_REQUEST));
        }
        company.website = website;
    }
    if (company_manager) {
        if (
            !mongoose.Types.ObjectId.isValid(company_manager) ||
            !(await EmployerProfile.findById(company_manager))
        ) {
            return next(new AppError("Invalid company_manager ID", StatusCodes.BAD_REQUEST));
        }
        company.company_manager = company_manager;
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        if (req.files.length > 1) {
            return next(new AppError("Only one file is allowed", StatusCodes.BAD_REQUEST));
        }
        const avatar = req.files[0];
        if (!avatar.mimetype.startsWith("image")) {
            return next(new AppError("Only image files are allowed", StatusCodes.BAD_REQUEST));
        }
        const fileExtension = avatar.originalname.split(".").pop();
        if (!/\.(jpg|jpeg|png)$/.test(`.${fileExtension}`)) {
            return next(
                new AppError("Only jpg, jpeg and png files are allowed", StatusCodes.BAD_REQUEST)
            );
        }
        if (avatar.size > 1024 * 1024) {
            return next(new AppError("File size must not exceed 1MB", StatusCodes.BAD_REQUEST));
        }

        if (company.avatar) {
            await Image.findByIdAndDelete(company.avatar);
        }

        const image = await Image.create({
            originalname: avatar.originalname,
            contentType: avatar.mimetype,
            data: avatar.buffer,
        });

        company.avatar = image._id;
    } else if (req.files && Array.isArray(req.files)) {
        console.log(req.files);
        if (company.avatar) {
            await Image.findByIdAndDelete(company.avatar);
            company.avatar = undefined;
        }
    }

    await company.save();

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company,
        },
    });
});

export const getACompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.companyId;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return next(new AppError("Invalid company ID", StatusCodes.BAD_REQUEST));
    }

    const company = await Company.findOne({ _id: companyId })
        .populate("avatar")
        .populate("employers")
        .populate("company_manager");

    if (!company) {
        return next(new AppError("Company ID not found", StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: company,
        },
    });
});
