import { Request, Response, NextFunction } from "express";
import User, { USER_STATUSES } from "../models/user";
import EmployerProfile from "../models/employerProfile";
import CandidateProfile from "../models/candidateProfile";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import { isNotFound, isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import Email from "../utils/email";
import FollowCompany from "../models/followCompany";
import Log from "../models/log";
import { LOG_ACTIONS } from "../models/log";

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
        return next(new AppError("Please provide an email", StatusCodes.BAD_REQUEST));
    }

    if (!validator.isEmail(req.body.email)) {
        return next(new AppError("Please provide a valid email", StatusCodes.BAD_REQUEST));
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("User not found", StatusCodes.NOT_FOUND));
    }

    // soft delete by setting active to false
    await User.updateOne({ email: req.body.email }, { $set: { active: false } });
    if (user.role === "employer") {
        await EmployerProfile.updateOne({ user_id: user._id }, { $set: { active: false } });
    } else if (user.role === "candidate") {
        await CandidateProfile.updateOne({ user_id: user._id }, { $set: { active: false } });
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: null,
    });
});

export const lockUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.body.user;
    const { id } = req.body;
    isObjectIdOfMongoDB(id, "id", `Invalid id: ${id} in body`);

    const user = await User.findById(id);

    console.log("status, ",id, user,  user?.status, USER_STATUSES.ACTIVE);
    

    if (user?.status !== USER_STATUSES.ACTIVE) {
        return next(new AppError("User is not active", StatusCodes.BAD_REQUEST));
    }

    await user?.updateOne({ active: false, status: USER_STATUSES.LOCKED });
    isNotFound(user, "", "User not found with the provided userId");

    if (user!.role === "employer") {
        await EmployerProfile.findByIdAndUpdate(user?.profile_id, { active: false });
    } else if (user!.role === "candidate") {
        await CandidateProfile.findByIdAndUpdate(user?.profile_id, { active: false });
    }

    new Email(user!).informLockedAccount();

    await Log.create({
        user_id: admin._id,
        action: LOG_ACTIONS.LOCK_USER,
        details: {
            locked_user_id: id,
            locked_by: admin._id,
            // reason: req.body.reason || null,
        },
        ip: req.ip,
        user_agent: req.get("User-Agent"),
        timestamp: new Date(),
    })

    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: null,
        },
    });
});
export const unlockUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.body.user;
    const { id } = req.body;
    isObjectIdOfMongoDB(id, "id", `Invalid id: ${id} in body`);

    const user = await User.findById(id);

    if (user?.status !== USER_STATUSES.LOCKED) {
        return next(new AppError("User is not active", StatusCodes.BAD_REQUEST));
    }

    await user?.updateOne({ active: true, status: USER_STATUSES.ACTIVE });
    isNotFound(user, "", "User not found with the provided userId");

    if (user!.role === "employer") {
        await EmployerProfile.findByIdAndUpdate(user?.profile_id, { active: true });
    } else if (user!.role === "candidate") {
        await CandidateProfile.findByIdAndUpdate(user?.profile_id, { active: true });
    }

    new Email(user!).informUnlockedAccount();

    await Log.create({
        user_id: admin._id,
        action: LOG_ACTIONS.UNLOCK_USER,
        details: {
            unlocked_user_id: id,
            unlocked_by: admin._id,
        },
        ip: req.ip,
        user_agent: req.get("User-Agent"),
        timestamp: new Date(),
    })

    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: null,
        },
    });
});

export const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    isRequired(email, "email");
    isRequired(password, "password");

    if (!validator.isEmail(email)) {
        return next(new AppError("Please provide a valid email", StatusCodes.BAD_REQUEST));
    }

    if (await User.exists({ email })) {
        return next(new AppError("User already exists with the provided email", StatusCodes.BAD_REQUEST));
    }

    const user = await User.create({ email, password, role: "admin" });

    user.password = undefined;

    await Log.create({
        user_id: user._id,
        action: LOG_ACTIONS.CREATE_ADMIN,
        details: {
            created_admin_id: user._id,
        },
        ip: req.ip,
        user_agent: req.get("User-Agent"),
        timestamp: new Date(),
    })

    return res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const followCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const companyId = req.params.companyId;
    const followCompany = await FollowCompany.create({ user_id: userId, company_id: companyId });
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            followCompany,
        },
    });
});

export const getFollowedCompanies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const followedCompanies = await FollowCompany.find({ user_id: userId }).populate("company_id");
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            followedCompanies,
        },
    });
});

export const unfollowCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const companyId = req.params.companyId;
    await FollowCompany.findOneAndDelete({ user_id: userId, company_id: companyId });
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            followCompany: null,
        },
    });
});

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    isObjectIdOfMongoDB(id, "id", `Invalid id: ${id} in params`);
    const resultRecord = (await User.findById(id).populate("profile_id")) as any;
    isNotFound(resultRecord, "", `User not found with the provided id: ${id}`);

    const userFiltered = {
        _id: resultRecord?._id,
        email: resultRecord?.email || null,
        role: resultRecord?.role || null,
        avatar: resultRecord?.profile_id?.avatar || null,
        full_name: resultRecord?.profile_id?.full_name || null,
        phone: resultRecord?.profile_id?.phone || null,
        address: resultRecord?.profile_id?.address || null,
        introduction: resultRecord?.profile_id?.introduction || null,
        company_id: resultRecord?.profile_id?.company_id || null,
    };
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: userFiltered,
        },
    });
});

export const getCandidates = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await User.find({ role: "candidate" }).populate("profile_id");

    const filteredCandidates = candidates.map((candidate: any) => {
        return {
            _id: candidate._id,
            email: candidate.email || null,
            role: candidate.role || null,
            full_name: candidate.profile_id?.full_name || null,
            phone: candidate.profile_id?.phone || null,
            address: candidate.profile_id?.address || null,
            introduction: candidate.profile_id?.introduction || null,
            avatar: candidate.profile_id?.avatar || null,
            status: candidate.status || null,
            statusReason: candidate.statusReason || null,
        };
    });
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_candidates: filteredCandidates.length,
            candidates: filteredCandidates,
        },
    });
});

export const getEmployers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const employers = await User.find({ role: "employer" }).populate("profile_id");

    const filteredEmployers = employers.map((employer: any) => {
        return {
            _id: employer?._id,
            email: employer?.email || null,
            role: employer?.role || null,
            status: employer?.status || null,
            contact_email: employer?.profile_id?.contact_email || null,
            full_name: employer?.profile_id?.full_name || null,
            introduction: employer?.profile_id?.introduction || null,
            phone: employer?.profile_id?.phone || null,
            address: employer?.profile_id?.address || null,
            company_id: employer?.profile_id?.company_id || null,
            company_role: employer?.profile_id?.company_role || null,
            avatar: employer?.profile_id?.avatar || null,
        };
    });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            total_employers: filteredEmployers.length,
            employers: filteredEmployers,
        },
    });
});
