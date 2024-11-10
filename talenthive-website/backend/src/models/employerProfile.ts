import { model, Schema, Types } from "mongoose";
import validator from "validator";

export interface IEmployerProfile {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    full_name: string;
    avatar: object;
    introduction: string;
    address: string;
    email: string;
    phone: string;
    sector: string;
    created_at: Date;
    updated_at: Date;
}

const EmployerProfileSchema = new Schema<IEmployerProfile>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    full_name: {
        type: String,
        required: true,
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
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    phone: {
        type: String,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },
    sector: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now()
    }
})

const EmployerProfile = model<IEmployerProfile>('EmployerProfile', EmployerProfileSchema);

export default EmployerProfile;