import User from "../models/user";
import TokenBlacklist from "../models/tokenBlacklist";
import jwt from "jsonwebtoken";

const accessToken = (user: InstanceType<typeof User>) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error('JWT_ACCESS_SECRET not defined');
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h'
    });
};

const refreshToken = (user: InstanceType<typeof User>) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET not defined');
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};

const invalidateToken = async(token: string) => {
    if (!token) {
        throw new Error('Token is not valid');
    }

    await TokenBlacklist.create({token});

    return {
        token,
        invalidatedAt: Date.now()
    };
};

const verifyAccessToken = (token: string) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error('JWT_ACCESS_SECRET not defined');
    }
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { id: string, role: string };
};

export { accessToken, refreshToken, invalidateToken, verifyAccessToken };