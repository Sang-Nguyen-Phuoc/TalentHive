import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import validator from "validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Email from "../utils/email";
import crypto from "crypto";
import CandidateProfile from "../models/candidateProfile";
import EmployerProfile from "../models/employerProfile";
import { createSendToken } from "../utils/tokenServices";
import { StatusCodes } from "http-status-codes";

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    // Check if all required fields are filled
    if (!email || !password || !role) {
        return next(new AppError("Please provide email, password and role", StatusCodes.BAD_REQUEST));
    }

    // Check email format
    if (!validator.isEmail(email)) {
        return next(new AppError("Email is not valid", StatusCodes.BAD_REQUEST));
    }

    if (role !== "candidate" && role !== "employer") {
        return next(new AppError("Role must be candidate or employer", StatusCodes.BAD_REQUEST));
    }

    // Check if user already exists
    if (await User.findOne({ email: email })) {
        return next(new AppError("User already exists", StatusCodes.BAD_REQUEST));
    }

    let profile = null;

    if (role === "candidate") {
        profile = await CandidateProfile.create({ email: email });
    } else if (role === "employer") {
        profile = await EmployerProfile.create({ email: email });
    }

    const newUser = await User.create({ email, password, role, profile_id: profile ? profile._id : undefined });

    newUser.password = undefined;

    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password", StatusCodes.BAD_REQUEST));
    }

    // Check if user exists
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new AppError("Email is not found", StatusCodes.NOT_FOUND));
    }

    // Check if password is correct
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("Wrong password", StatusCodes.UNAUTHORIZED));
    }

    createSendToken(user, StatusCodes.OK, res);
});

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.body.accessToken;
    if (!accessToken) {
        return next(
            new AppError("attachUserId middleware must be called before logout route", 500)
        );
    }

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            accessToken: null,
        },
    });
});

export const changePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword) {
            return next(new AppError("currentPassword is required", StatusCodes.BAD_REQUEST));
        }
        if (!newPassword) {
            return next(new AppError("newPassword is required", StatusCodes.BAD_REQUEST));
        }

        // Get userId from attachUserId middleware
        const userId = req.body.userId;
        if (!userId) {
            return next(new AppError("attachUserId middleware not working", 500));
        }
        const currentUser = await User.findOne({ _id: userId }).select("+password");

        // Get access token from attachUserId middleware
        const accessToken = req.body.accessToken;

        // Check if current password is correct
        if (
            !currentUser?.password ||
            !(await bcrypt.compare(currentPassword, currentUser?.password))
        ) {
            return next(new AppError("Current password is incorrect", 403));
        }

        // Update password and timestamp
        currentUser.password = newPassword;
        currentUser.password_changed_at = new Date();
        await currentUser.save();

        currentUser.password = undefined;

        res.status(StatusCodes.OK).json({
            status: "success",
            data: {
                user: currentUser,
            },
        });
    }
);

export const forgotPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // 1) Get user based on POSTed email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new AppError(`There is no user with email address ${req.body.email}`, StatusCodes.NOT_FOUND));
        }

        // 2) Generate the random reset token
        const resetToken = user?.createPasswordResetToken();
        await user?.save({ validateBeforeSave: false });

        // 3) Send it to user's email
        try {
            const resetURL = `${req.protocol}://${req.get(
                "host"
            )}/api/v1/auth/resetPassword/${resetToken}`;
            await new Email(user, resetURL).sendPasswordReset();

            res.status(StatusCodes.OK).json({
                status: "success",
                message: "Token was sent to email!",
            });
        } catch (err) {
            if (!user) {
                return next(
                    new AppError("There was an error sending the email. Try again later!", 500)
                );
            }
            user.password_reset_token = undefined;
            user.password_reset_expires = undefined;
            await user?.save({ validateBeforeSave: false });

            return next(
                new AppError("There was an error sending the email. Try again later!", 500)
            );
        }
    }
);

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        password_reset_token: hashedToken,
        password_reset_expires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError("Token is invalid or has expired", StatusCodes.BAD_REQUEST));
    }
    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user

    user.password_changed_at = new Date();
    await user.save();

    // 4) Log the user in, send JWT

    createSendToken(user, StatusCodes.OK, res);
});

export const deleteMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    if (!userId) {
        return next(new AppError("attachUserId middleware not working", 500));
    }

    if (!(await User.findOne({ _id: userId }))) {
        return next(new AppError("User not found", StatusCodes.NOT_FOUND));
    }

    await User.updateOne({ _id: userId }, { $set: { active: false } });

    await CandidateProfile.updateOne({ user_id: userId }, { $set: { active: false } });

    await EmployerProfile.updateOne({ user_id: userId }, { $set: { active: false } });

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: null,
        },
    });
});

export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.body.user;
    if (!currentUser) {
        return next(new AppError("attachUser middleware must be called before getMe route", 500));
    }

    let profile;
    if (currentUser.role === "candidate") {
        profile = await CandidateProfile.findOne({ user_id: currentUser._id });
    } else if (currentUser.role === "employer") {
        profile = await EmployerProfile.findOne({ user_id: currentUser._id });
    }

    if (!profile) {
        return next(new AppError("Profile not found for this user", 500));
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            profile,
            user: currentUser
        }
    });
});
