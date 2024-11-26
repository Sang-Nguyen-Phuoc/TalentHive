import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";

export interface ICandidateProfile {
    user_id: Types.ObjectId;
    full_name: string;
    email: string;
    date_of_birth: Date;
    gender: boolean;
    phone_number: string;
    address: string;
    city: string;
    education: string;
    skills: [string];
    certifications: [string];
    experience: string;
    work_experience: string;
    resume: object;
    avatar: object;
    created_at: Date;
    updated_at: Date;
    visibility: boolean;
    active: boolean;
}

const CandidateProfileSchema = new Schema<ICandidateProfile>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    full_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email address']
    },
    date_of_birth: {
        type: Date,
    },
    gender: {
        type: Boolean,
    },
    phone_number: {
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
    education: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
    },
    certifications: {
        type: [String],
    },
    experience: {
        type: String,
    },
    work_experience: {
        type: String,
    },
    resume: {
        type: Object,
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
    