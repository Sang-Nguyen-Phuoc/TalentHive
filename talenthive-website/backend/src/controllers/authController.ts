import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import validator from "validator";
import * as tokenGenerator from "../utils/tokenGenerator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Email from "../utils/email";
import crypto from "crypto";

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = tokenGenerator.accessToken(user);

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    // Check if all required fields are filled
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    // Check if user already exists
    if (await User.findOne({ email: email })) {
        return next(new AppError("User already exists", 400));
    }

    // Check email format
    if (!validator.isEmail(email)) {
        return next(new AppError("Email is not valid", 400));
    }

    // Use bcrypt to hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // no need to hash password here, it is done in the User model

    // Create new user
    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const userPassword = req.body.password;

    // Check if all required fields are filled
    if (!email || !userPassword) {
        return next(new AppError("Please provide email and password", 400));
    }

    // Check if user exists
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new AppError("Email is not found", 401));
    }

    // Check if password is correct
    if (!(await bcrypt.compare(userPassword, user.password))) {
        return next(new AppError("Wrong password", 401));
    }

    // Create access token
    const accessToken = tokenGenerator.accessToken(user);

    // Create refresh token
    const refreshToken = tokenGenerator.refreshToken(user);

    // Store refresh token in http-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
    });

    // Remove password from user object
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
        status: "success",
        data: {
            user: userWithoutPassword,
            accessToken: accessToken,
        },
    });
});

const logout = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    // Get the token
    const token = req.body.accessToken;

    if (!token) {
        return next(new AppError("There is no token", 401));
    }
    else {
        tokenGenerator.invalidateToken(token);
    }

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        path: "/",
        sameSite: "strict"
    });

    // Response if successful
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
});

const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        next(new AppError(`There is no user with email address ${req.body.email}`, 404));
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

        res.status(200).json({
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

        return next(new AppError("There was an error sending the email. Try again later!", 500));
    }
});

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        password_reset_token: hashedToken,
        password_reset_expires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user

    user.password_changed_at = new Date();
    await user.save();

    // 4) Log the user in, send JWT

    createSendToken(user, 200, res);
});

export { register, login, logout, forgotPassword, resetPassword };
