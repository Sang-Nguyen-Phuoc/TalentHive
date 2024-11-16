import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import EmployerProfile from "../models/employerProfile";
import WorkerProfile from "../models/workerProfile";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params);
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email) {
            return next(new AppError("Please provide an email", 400));
        }

        if (!validator.isEmail(req.body.email)) {
            return next(new AppError("Please provide a valid email", 400));
        }

        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // soft delete by setting active to false
        await User.updateOne({email: req.body.email}, { $set: { active: false } });
        if (user.role === 'employer') {
            await EmployerProfile.updateOne({user_id: user._id}, { $set: { active: false } });
        } else if (user.role === 'worker') {
            await WorkerProfile.updateOne({user_id: user._id}, { $set: { active: false } });
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        return next(new AppError("Database error", 500));
    }
});


export { getAllUsers, getUserById, createUser, updateUser, deleteUser };