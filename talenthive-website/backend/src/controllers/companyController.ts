import mongoose from "mongoose";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import e, { NextFunction, Request, Response } from "express";

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import Company from "../models/company";
import Image from "../models/image";
import EmployerProfile, { IEmployerProfile } from "../models/employerProfile";
import { isObjectIdOfMongoDB, isRequired, isString } from "../utils/validateServices";
import User from "../models/user";
import { isURL } from "../utils/validateServices";

export const getAllCompanies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.find().populate("company_manager").populate("avatar");
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            companies,
        },
    });
});

export const createCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const employerProfile = await EmployerProfile.findById(user.profile_id);
    if (!employerProfile) {
        return next(new AppError("Employer profile not found", StatusCodes.NOT_FOUND));
    }
    if (employerProfile.company_id) {
        return next(new AppError("Employer already has a company", StatusCodes.BAD_REQUEST));
    }
    
    const { name, industry, addresses, website, introduction, phone } = req.body;
    isRequired(name, "name");
    isRequired(industry, "industry");
    isRequired(addresses, "addresses");
    isString(introduction, "introduction");
    isString(phone, "phone");
    isString(website, "website");
    isURL(website, "website");

    if (addresses && (!Array.isArray(addresses) || !addresses.every((address) => typeof address === "string"))) {
        return next(new AppError("addresses must be an array of strings", StatusCodes.BAD_REQUEST));
    }
    if (addresses.length === 0) {
        return next(new AppError("addresses must have at least one address", StatusCodes.BAD_REQUEST));
    }

    let image = null;

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
            return next(new AppError("Only jpg, jpeg and png files are allowed", StatusCodes.BAD_REQUEST));
        }
        if (avatar.size > 1024 * 1024) {
            return next(new AppError("File size must not exceed 1MB", StatusCodes.BAD_REQUEST));
        }

        image = await Image.create({
            originalname: avatar.originalname,
            contentType: avatar.mimetype,
            data: avatar.buffer,
        });

    } else {
    }
    const company = await Company.create({
        name: name || null,
        avatar: image ? image._id : null,
        introduction: introduction || null,
        industry: industry || null,
        addresses: addresses || null,
        website: website || null,
        company_manager: user._id,
    });

    employerProfile.company_id = company._id;
    employerProfile.company_role = "company_manager";
    await employerProfile.save();

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
        if (!Array.isArray(locations) || !locations.every((location) => typeof location === "string")) {
            return next(new AppError("locations must be an array of strings", StatusCodes.BAD_REQUEST));
        }
        if (locations.length === 0) {
            return next(new AppError("locations must have at least one location", StatusCodes.BAD_REQUEST));
        }
        company.addresses = locations;
    }
    if (industry) {
        company.industry = industry;
    }
    if (address) {
        company.addresses = [address];
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
        if (!mongoose.Types.ObjectId.isValid(company_manager) || !(await EmployerProfile.findById(company_manager))) {
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
            return next(new AppError("Only jpg, jpeg and png files are allowed", StatusCodes.BAD_REQUEST));
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
        // .populate("employers")
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

export const getACompanyByEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.user.role; // from token
    const id = req.body.user._id; // from token
    isObjectIdOfMongoDB(id, "id");

    if (role !== "employer") {
        return next(new AppError("Only employer can access this route", StatusCodes.UNAUTHORIZED));
    }

    const company = await Company.findOne({
        $or: [{ employers: { $in: [id] } }, { company_manager: id }],
    });

    if (!company) {
        return next(new AppError("Company not found", StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: company,
        },
    });
});

export const getACompanyByEmployerId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const employerId = req.params.employerId;
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
        return next(new AppError("Invalid employer ID", StatusCodes.BAD_REQUEST));
    }

    const employer = await User.findById(employerId);
    if (!employer) {
        return next(new AppError(`Employer with id: ${employerId} not found`, StatusCodes.NOT_FOUND));
    }
    if (employer.role !== "employer") {
        return next(new AppError(`User with id: ${employerId} is not an employer`, StatusCodes.BAD_REQUEST));
    }

    const employerProfile = await EmployerProfile.findById(employer.profile_id);
    if (!employerProfile) {
        return next(new AppError(`Employer profile with id: ${employer.profile_id} not found`, StatusCodes.NOT_FOUND));
    }
    if (!employerProfile.company_id) {
        return next(
            new AppError(`Employer with id: ${employerId} is not associated with any company`, StatusCodes.NOT_FOUND)
        );
    }
    const company = await Company.findById(employerProfile.company_id).populate("company_manager");
    if (!company) {
        return next(
            new AppError(
                `Company with id: ${employerProfile.company_id} in employer profile not found`,
                StatusCodes.NOT_FOUND
            )
        );
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: company,
        },
    });
});

export const getMyCompanyAsEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    if (!user.profile_id) {
        return next(new AppError(`Employer with id: ${user._id} has no profile`, StatusCodes.NOT_FOUND));
    }
    const employerProfile = await EmployerProfile.findById(user.profile_id);
    if (!employerProfile) {
        return next(new AppError(`Employer profile with id: ${user.profile_id} not found`, StatusCodes.NOT_FOUND));
    }
    if (!employerProfile.company_id) {
        return next(new AppError(`Employer with id: ${user._id} is not associated with any company`, StatusCodes.NOT_FOUND));
    }
    const company = await Company.findById(employerProfile.company_id);
    if (!company) {
        return next(new AppError(`Company with id: ${employerProfile.company_id} in employer profile not found`, StatusCodes.NOT_FOUND));
    }    
    if (company.company_manager?.toString() !== user._id.toString()) {
        return next(new AppError(`Employer with id: ${user._id} is not the company manager`, StatusCodes.UNAUTHORIZED));
    }
    
    const companyFields = {
        name: company.name,
        industry: company.industry,
        addresses: company.addresses,
        website: company.website,
        introduction: company.introduction,
        company_manager: employerProfile.full_name,
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: companyFields,
        },
    });
});
