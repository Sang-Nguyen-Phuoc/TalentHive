import { model, Schema, Types } from "mongoose";
import validator from "validator";

export interface IEmployerProfile {
    _id?: Types.ObjectId;
    email?: string;
    contact_email?: string;
    full_name?: string;
    introduction?: string;
    avatar?: string;
    phone?: string;
    address?: string;
    company_id?: Types.ObjectId;
    company_role?: string;
    category?: string;
    active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

const EmployerProfileSchema = new Schema<IEmployerProfile>({
    full_name: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
    },
    introduction: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "Company",
    },
    company_role: {
        type: String,
        trim: true,
        enum: ["company_manager", "employer"],
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Invalid email address"],
    },
    contact_email: {
        type: String,
        validate: [validator.isEmail, "Invalid email address"],
    },
    phone: {
        type: String,
    },
    category: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const EmployerProfile = model<IEmployerProfile>("EmployerProfile", EmployerProfileSchema);

export default EmployerProfile;
