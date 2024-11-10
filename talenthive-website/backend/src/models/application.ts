import { model, Schema, Types } from "mongoose";
import validator from "validator";

export interface IApplication {
    _id: Types.ObjectId;
    job_id: Types.ObjectId;
    worker_id: Types.ObjectId;
    full_name: string;
    resume: object;
    email: string;
    cover_letter: string;
    phone: string;
    status?: string;
    applied_at?: Date;
}

const ApplicationSchema = new Schema<IApplication>({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    worker_id: {
        type: Schema.Types.ObjectId,
        ref: 'WorkerProfile',
        required: true
    },
    full_name: {
        type: String,
        required: false,
        trim: true
    },
    resume: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    cover_letter: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Invalid phone number']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        required: true,
        default: 'pending'
    },
    applied_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Application = model<IApplication>('Application', ApplicationSchema);

export default Application;