import { model, Schema, Types } from "mongoose";

export interface IApplication {
    _id: Types.ObjectId;
    job_id: Types.ObjectId;
    candidate_id: Types.ObjectId;

    full_name: string;
    email: string;
    phone: string;
    skills: string;
    worker_experience: string;
    certification: string;
    cover_letter: string;
    cv: object;

    resume: object;
    status?: string;
    applied_at?: Date;
}

const ApplicationSchema = new Schema<IApplication>({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
    },
    candidate_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    full_name: {
        type: String,
        required: false,
        trim: true
    },
    resume: {
        type: Object,
    },
    email: {
        type: String,
        required: true,
    },
    cover_letter: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
    },
    skills: {
        type: String,
    },  
    worker_experience: {
        type: String,
        trim: true
    },
    certification: {
        type: String,
    },
    cv: {
        type: Object,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    applied_at: {
        type: Date,
        default: Date.now()
    }
});

const Application = model<IApplication>('Application', ApplicationSchema);

export default Application;