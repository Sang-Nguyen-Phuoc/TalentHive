import { Request, Response } from 'express';
import User from '../models/user';
import validator from 'validator';

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, confirm_password } = req.body;

        // Check if all required fields are filled
        if (!email || !password || !confirm_password) {
            res.status(400).send("Please fill all required fields");
            return;
        }
        
        // Check if password and confirm_password match
        if (password !== confirm_password) {
            res.status(400).send("Passwords do not match");
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

        // Create new user
        const newUser = new User({ email, password, confirm_password });
        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

export { register };
