import User from "../models/user";
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

export { accessToken, refreshToken };