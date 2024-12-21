import EmployerProfile from "../models/employerProfile";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import { isNotFound, isObjectIdOfMongoDB } from "../utils/validateServices";
import Company from "../models/company";

export const getAllEmployers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const employers = await EmployerProfile.find().populate("user_id");
        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                employers,
            },
        });
    }
);


export const getEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    isObjectIdOfMongoDB(id, "id", `Invalid id: ${id} in params`);
    const resultRecord = (await User.findById(id).populate("profile_id")) as any;
    isNotFound(resultRecord, "", `User not found with the provided id: ${id}`);

    const company = await Company.findById(resultRecord?.profile_id?.company_id);

    const userFiltered = {
        _id: resultRecord?._id,
        email: resultRecord?.email || null,
        contact_email: resultRecord?.profile_id?.email || null,
        role: resultRecord?.role || null,
        avatar: resultRecord?.profile_id?.avatar || null,
        full_name: resultRecord?.profile_id?.full_name || null,
        phone: resultRecord?.profile_id?.phone || null,
        address: resultRecord?.profile_id?.address || null,
        introduction: resultRecord?.profile_id?.introduction || null,
        company: company || null,
    };
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: userFiltered,
        },
    });
});



export const updateEmployer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        full_name,
        avatar,
        introduction,
        address,
        email,
        phone,
        category
    } = req.body;

    let employer: any;
    try {
        employer = await EmployerProfile.findOne({ user_id: req.body.userId });
    } catch(err) {
        return next(new AppError("Database error occurred. Please try again", 500));
    }
  
  
    if (!employer) {
        return next(new AppError("Employer not found", 404));
    }

    // check if at least one field is provided
    if (!full_name && !avatar && !introduction && !address && !email && !phone && !category) {
        return next(new AppError("At least one field is required", 400));
    }

    if (full_name) {
        if (typeof full_name !== "string") {
            return next(new AppError("Full name must be a string", 400));
        }
       
        // if full_name contains non-alphabetic characters
        if (!/^[a-zA-Z ]+$/.test(full_name)) {
            return next(new AppError("Full name must contain only alphabetic characters", 400));
        }
    }

    if (avatar && typeof avatar !== "object") {
        return next(new AppError("Avatar must be an object", 400));
    }

    if (introduction && typeof introduction !== "string") {
        return next(new AppError("Introduction must be a string", 400));
    }

    if (address && typeof address !== "string") {
        return next(new AppError("Address must be a string", 400));
    }

    if (email && !validator.isEmail(email)) {
        return next(new AppError("Invalid email address", 400));
    }

    if (phone && !validator.isMobilePhone(phone)) {
        return next(new AppError("Invalid phone number", 400));
    }

    if (category && typeof category !== "string") {
        return next(new AppError("category must be a string", 400));
    }


    // just update the fields that are provided
    const updatedEmployer = await EmployerProfile.findOneAndUpdate(
        { user_id: req.body.userId },
        {
            full_name: full_name || employer.full_name,
            avatar: avatar || employer.avatar,
            introduction: introduction || employer.introduction,
            address: address || employer.address,
            email: email || employer.email,
            phone: phone || employer.phone,
            category: category || employer.category
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            employer: updatedEmployer
        }
    });
});

export const deleteEmployerById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {employerId} = req.params;
    isObjectIdOfMongoDB(employerId, "employerId", "employerId in params is not a valid MongoDB ObjectId");

    const employer = await User.findById(employerId);
    if (!employer)
        return next(new AppError(`Employer with id: ${employerId} not found`, StatusCodes.NOT_FOUND));

    if (employer.role !== "employer")
        return next(new AppError("The user is not an employer", StatusCodes.BAD_REQUEST));

    const employerProfile = await EmployerProfile.findById(employer.profile_id);
    if (!employerProfile)
        return next(new AppError(`Employer profile with id: ${employer.profile_id} not found`, StatusCodes.NOT_FOUND));

    await employer.updateOne({ active: false });
    await employerProfile.updateOne({ active: false });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: null
        }
    })
})