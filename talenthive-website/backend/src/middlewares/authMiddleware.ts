import { Request, Response, NextFunction } from 'express';

import TokenBlacklist from '../models/tokenBlacklist';
import AppError from '../utils/appError';


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Please provide access token', 400));
    }

    // 2. Check if token is blacklisted
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
        return next(new AppError('Token is invalid', 404));
    }

    try {
        // 3. Verify token
        // const decoded = tokenGenerator.verifyAccessToken(token);

        // 4. Check if user still exists
        // const currentUser = await User.findById(decoded.id);
        // if (!currentUser) {
        //     return next(new AppError('User no longer exists', 401));
        // }

        // Grant access to protected route
        // req.body.user = currentUser;
        next();
    } catch (error) {
        return next(new AppError('Invalid token', 401));
    }
};