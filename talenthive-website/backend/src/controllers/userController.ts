import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import EmployerProfile from "../models/employerProfile";
import CandidateProfile from "../models/candidateProfile";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import { isNotFound, isObjectIdOfMongoDB, isRequired } from "../utils/validateServices";
import Email from "../utils/email";

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
  const { email, userAccountId } = req.body;
  if (!email && !userAccountId) {
    return next(new AppError("Please provide an email or userAccountId", StatusCodes.BAD_REQUEST));
  }
  if (email && userAccountId) {
    return next(new AppError("Please provide an email or userAccountId, but not both", StatusCodes.BAD_REQUEST));
    }

  let user = undefined;

  if (userAccountId) {
    isObjectIdOfMongoDB(userAccountId, "userId");
    user = await User.findByIdAndUpdate(userAccountId, { active: false });
    console.log({ user });
    
    isNotFound(user, "", "User not found with the provided userAccountId");
  } else if (email) {
    if (!validator.isEmail(email)) {
      return next(new AppError("Please provide a valid email", StatusCodes.BAD_REQUEST));
    }
    user = await User.findOneAndUpdate({ email: email }, { active: false });
    console.log({ user });
    
    isNotFound(user, "", "User not found with the provided email");
  } else {
    return next(new AppError("Please provide an email or userId", StatusCodes.BAD_REQUEST));
  }

  if (user!.role === "employer") {
    await EmployerProfile.findOneAndUpdate({ user_id: userAccountId }, { active: false });
  } else if (user!.role === "candidate") {
    await CandidateProfile.findOneAndUpdate({ user_id: userAccountId }, { active: false });
  }

  new Email(user!).informLockedAccount();

  return res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      user: null,
    },
  });
});

export const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  isRequired(email, "email");
  isRequired(password, "password");

  if (!validator.isEmail(email)) {
    return next(new AppError("Please provide a valid email", StatusCodes.BAD_REQUEST));
  }

  const user = await User.create({ email, password, role: "admin" });

  user.password = undefined;

  return res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      user,
    },
  });
});
