import { NextFunction } from "express";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

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