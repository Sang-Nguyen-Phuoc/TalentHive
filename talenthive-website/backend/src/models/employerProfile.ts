import { model, Schema, Types } from "mongoose";
import validator from "validator";

export interface IEmployerProfile {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    full_name: string;
    avatar: object;
    introduction: string;
    address: string;
    company_id: Types.ObjectId;
    company_role: string;
    email: string;
    phone: string;
    category: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

const EmployerProfileSchema = new Schema<IEmployerProfile>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    full_name: {
        type: String,
        trim: true
    },
    avatar: {
        type: Object,
    },
    introduction: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    company_role: {
        type: String,
        trim: true,
        enum: ["company_manager", "employee"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email address']
    },
    phone: {
        type: String,
    },
    category: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

const EmployerProfile = model<IEmployerProfile>('EmployerProfile', EmployerProfileSchema);

export default EmployerProfile;