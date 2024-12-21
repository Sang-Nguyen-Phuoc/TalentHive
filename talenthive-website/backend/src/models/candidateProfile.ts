import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";

export interface ICandidateProfile {
    _id?: Types.ObjectId;
    full_name: string;
    email: string;
    contact_email: string;
    introduction: string;
    date_of_birth: Date;
    gender: boolean;
    phone: string;
    address: string;
    city: string;
    skills: string;
    certification: string;
    work_experience: string;
    avatar: object;
    created_at: Date;
    updated_at: Date;
    visibility: boolean;
    active: boolean;
}

const CandidateProfileSchema = new Schema<ICandidateProfile>({
    full_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email address']
    },
    contact_email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email address']
    },
    introduction: {
        type: String,
        trim: true
    },
    date_of_birth: {
        type: Date,
    },
    gender: {
        type: Boolean,
    },
    phone: {
        type: String,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    skills: {
        type: String,
    },
    certification: {
        type: String,
    },
    work_experience: {
        type: String,
    },
    avatar: {
        type: Object,
    },
    visibility: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
})

const CandidateProfile = mongoose.model<ICandidateProfile>('CandidateProfile', CandidateProfileSchema);

export default CandidateProfile;
    