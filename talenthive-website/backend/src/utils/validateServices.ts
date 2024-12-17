import { NextFunction } from "express";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import validator from "validator";

export const isRequired = (field: any, fieldName: string, messageCustom: string = "") => {
    if (!field) {
        throw new AppError(messageCustom.length === 0 ? `${fieldName} field is required` : messageCustom, StatusCodes.BAD_REQUEST)
    }
}

export const isObjectIdOfMongoDB = (field: any, fieldName: string, messageCustom: string = "") => {
    if (!mongoose.Types.ObjectId.isValid(field)) {
        throw new AppError(messageCustom.length === 0 ? `${fieldName} is not a valid MongoDB ObjectId` : messageCustom, StatusCodes.BAD_REQUEST);
    }
}

export const isNotFound = (field: any, fieldName: string, messageCustom: string = "") => {
    if (!field) {
        throw new AppError(messageCustom.length === 0  ? `${fieldName} not found ` : messageCustom, StatusCodes.NOT_FOUND);
    }
}

// if (website && typeof website !== "string") {
//     return next(new AppError("website must be a string", StatusCodes.BAD_REQUEST));
// }

export const isString = (field: any, fieldName: string, messageCustom: string = "") => {
    if (field && typeof field !== "string") {
        throw new AppError(messageCustom.length === 0 ? `${fieldName} must be a string` : messageCustom, StatusCodes.BAD_REQUEST);
    }
}

export const isURL = (field: any, fieldName: string, messageCustom: string = "") => {
    console.log(field);
    
    if (field && !validator.isURL(field)) {
        throw new AppError(messageCustom.length === 0 ? `${fieldName} is not a valid URL` : messageCustom, StatusCodes.BAD_REQUEST);
    }
}