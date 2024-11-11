import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import EmployerProfile from "../models/employerProfile";

export const testCraeteEmployerProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const employerProfile = await EmployerProfile.create({
            email: "sdsdd@gmail.com",
            full_name: "an nè",
            user_id: "673076dbb1b6bfaeaf04ae38",
        });

        res.status(201).json({
            status: "success",
            data: {
                employerProfile,
            },
        });
    }
);