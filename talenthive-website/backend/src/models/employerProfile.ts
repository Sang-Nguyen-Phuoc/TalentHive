import { model, Schema, Types } from "mongoose";
import validator from "validator";

interface IEmployerProfile {
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
        required: true
    },
    introduction: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },
    sector: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const EmployerProfile = model<IEmployerProfile>('EmployerProfile', EmployerProfileSchema);

export default EmployerProfile;