import mongoose from "mongoose";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import e, { NextFunction, Request, Response } from "express";

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import Company from "../models/company";
import Image from "../models/image";
import EmployerProfile, { IEmployerProfile } from "../models/employerProfile";
import { isNotFound, isObjectIdOfMongoDB, isRequired, isString } from "../utils/validateServices";
import User from "../models/user";
import { isURL } from "../utils/validateServices";
import Email from "../utils/email";

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
    console.log(req.body);

    const { user } = req.body;

    const employerProfile = await EmployerProfile.findById(user.profile_id);
    if (!employerProfile) {
        return next(new AppError("Employer profile not found", StatusCodes.NOT_FOUND));
    }
    if (employerProfile.company_id) {
        return next(new AppError("Employer already has a company", StatusCodes.BAD_REQUEST));
    }

    const { name, industry, addresses, website, introduction, phone, avatar } = req.body;
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

    const company = await Company.create({
        name: name || null,
        avatar: avatar || null,
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

export const updateCompanyByEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const employerProfile = await EmployerProfile.findById(user.profile_id);
    isNotFound(employerProfile, "", `Employer profile with id: ${user.profile_id} not found`);

    const company = await Company.findById(employerProfile!.company_id);
    isNotFound(company, "", `Company with id: ${employerProfile!.company_id} not found`);

    const { name, industry, addresses, website, introduction, avatar } = req.body;

    await company!.updateOne({
        name: name || company!.name || null,
        industry: industry || company!.industry || null,
        addresses: addresses || company!.addresses || null,
        website: website || company!.website || null,
        introduction: introduction || company!.introduction || null,
        avatar: avatar || company!.avatar || null,
    });

    const updatedCompany = await Company.findById(employerProfile!.company_id);

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: updatedCompany,
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
        return next(
            new AppError(`Employer with id: ${user._id} is not associated with any company`, StatusCodes.NOT_FOUND)
        );
    }
    const company = await Company.findById(employerProfile.company_id);
    if (!company) {
        return next(
            new AppError(
                `Company with id: ${employerProfile.company_id} in employer profile not found`,
                StatusCodes.NOT_FOUND
            )
        );
    }
    if (company.company_manager?.toString() !== user._id.toString()) {
        return next(new AppError(`Employer with id: ${user._id} is not the company manager`, StatusCodes.UNAUTHORIZED));
    }

    const companyFields = {
        name: company?.name || null,
        avatar: company?.avatar || null,
        industry: company?.industry || null,
        addresses: company?.addresses || null,
        website: company?.website || null,
        introduction: company?.introduction || null,
        company_manager: employerProfile?.full_name || null,
        company_manager_email: employerProfile?.contact_email || null,
    };

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: companyFields,
        },
    });
});

export const getHumanResources = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.id;
    isObjectIdOfMongoDB(companyId, "id", `Invalid company ID: ${companyId}`);

    const company = await Company.findById(companyId);
    isNotFound(company, "", `Company with id: ${companyId} not found`);

    const employers = await User.find({
        _id: { $in: company!.employers || [] },
    }).populate("profile_id");
    const employers_filtered = employers.map((employer: any) => ({
        _id: employer._id,
        full_name: employer.profile_id?.full_name,
        contact_email: employer.contact_email || employer.email || null,
        avatar: employer.profile_id?.avatar || null,
    }));

    const company_manager = await User.findById(company!.company_manager).populate("profile_id") as any;
    const company_manager_filtered = {
        _id: company_manager?._id,
        full_name: company_manager?.profile_id?.full_name,
        contact_email: company_manager?.contact_email || company_manager?.email || null,
        avatar: company_manager?.profile_id?.avatar || null,
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company_manager: company_manager_filtered,
            total_employers: employers.length,
            employers: employers_filtered,
        },
    });
});

export const generateAccessionCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const companyId = req.params.id;
    isObjectIdOfMongoDB(companyId, "id", `Invalid company ID: ${companyId}`);

    const company = await Company.findById(companyId);
    isNotFound(company, "", `Company with id: ${companyId} not found`);

    const accession_code = Math.random().toString(36).substring(2, 8).toUpperCase();
    company!.accession_code = accession_code;
    await company!.save();

    new Email(user).sendAccessionCode(accession_code);

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            accession_code: accession_code,
            email: user.email,
        },
    });
});

export const verifyAccessionCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { accession_code } = req.body;

    console.log(accession_code);
    
    

    const company = await Company.findOne({ accession_code: accession_code });
    isNotFound(company, "", `Company with accession code: ${accession_code} not found`);

    const employerProfile = await EmployerProfile.findById(user?.profile_id);
    isNotFound(employerProfile, "", `Employer profile with id: ${user?.profile_id} not found`);

    employerProfile!.company_id = company!._id;
    employerProfile!.company_role = "employer";
    await employerProfile!.save();

    company!.employers?.push(user._id);
    await company!.save();

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            company: company,
        },
    });
});

