import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import validator from 'validator';

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        // Check if all required fields are filled
        if (!email || !password ) {
            res.status(400).send("Please fill all required fields");
            return;
        }
        
        // Check if user already exists
        if (await User.findOne({ email: email })) {
            res.status(400).send("User already exists");
            return;
        }

        // Check email format
        if (!validator.isEmail(email)) {
            res.status(400).send("Invalid email address");
            return;
        }

        // Use bcrypt to hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email: email, password: hashedPassword, role: role });
        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
};

export { register };
