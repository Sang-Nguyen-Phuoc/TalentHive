import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    role: string;
    active: boolean;
    password_reset_token?: string;
    password_reset_expires?: Date;
    password_changed_at?: Date;
    created_at: Date;
    updated_at: Date;
    createPasswordResetToken: () => string;
    isModified: (field: string) => boolean;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    role: {
        type: String,
        enum: ['worker', 'employer', 'admin'],
    },
    password_changed_at: Date,
    password_reset_token: String,
    password_reset_expires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: Date
})

UserSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);

    next();
})

UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.password_reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({ resetToken }, this.password_reset_token);

    this.password_reset_expires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;