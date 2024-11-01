import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import validator from 'validator';
import * as tokenGenerator from '../utils/tokenGenerator';

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        // Check if all required fields are filled
        if (!email || !password ) {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
            return;
        }
        
        // Check if user already exists
        if (await User.findOne({ email: email })) {
            res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            });
            return;
        }

        // Check email format
        if (!validator.isEmail(email)) {
            res.status(400).send({
                status: 'fail',
                message: 'Email is not valid'
            });
            return;
        }

        // Use bcrypt to hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email: email, password: hashedPassword, role: role });
        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error
        });
    } 
};

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const userPassword = req.body.password;

        // Check if all required fields are filled
        if (!email || !userPassword) {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
            return;
        }

        // Check if user exists
        const user = await User.findOne({ email: email}).select('+password');
        if (!user) {
            res.status(401).json({
                status: 'fail',
                message: 'Email is not found'
            });
            return;
        }

        // Check if password is correct        
        if (!await bcrypt.compare(userPassword, user.password)) {
            res.status(401).json({
                status: 'fail',
                message: 'Wrong password'
            });
            return;
        }

        // Create access token
        const accessToken = tokenGenerator.accessToken(user);

        // Create refresh token
        const refreshToken = tokenGenerator.refreshToken(user);
        
        // Store refresh token in http-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict"
        });
        
        // Remove password from user object
        const {password, ...userWithoutPassword} = user.toObject();

        res.status(200).json({
            status: 'success',
            data: {
                user: userWithoutPassword,
                accessToken: accessToken
            }
        });

    } catch(err) {  
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

export { register, login };
