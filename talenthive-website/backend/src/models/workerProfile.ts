import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";

export interface IWorkerProfile {
    user_id: Types.ObjectId;
    full_name: string;
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
}

const WorkerProfileSchema = new Schema<IWorkerProfile>({
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
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    education: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: true
    },
    certifications: {
        type: [String],
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    work_experience: {
        type: String,
        required: true
    },
    resume: {
        type: Object,
        required: true,
    },
    avatar: {
        type: Object,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true
    }
})

const WorkerProfile = mongoose.model<IWorkerProfile>('WorkerProfile', WorkerProfileSchema);

export default WorkerProfile;
    