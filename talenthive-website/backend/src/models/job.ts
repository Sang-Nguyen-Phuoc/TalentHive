import { model, Schema, Types } from "mongoose";

interface IJob {
    _id: Types.ObjectId;
    title: string;
    company_id: Types.ObjectId;
    employer_id: Types.ObjectId;
    salary_range: string,
    location: string;
    description: string;
    skills: [string];
    requirements: [string];
    benefits: [string];
    posted_at: Date;
    expires_at: Date;
    views: number;
    created_at: Date;
    updated_at: Date;
    applications_count: number;
    job_type: Types.ObjectId;
    job_category: Types.ObjectId;
}

const JobSchema = new Schema<IJob>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    employer_id: {
        type: Schema.Types.ObjectId,
        ref: 'EmployerProfile',
        required: true
    },
    salary_range: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    benefits: {
        type: [String],
        required: true
    },
    posted_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    expires_at: {
        type: Date,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
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
    },
    applications_count: {
        type: Number,
        required: true,
        default: 0
    },
    job_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'JobType'
    },
    job_category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'JobCategory'
    }
});

const Job = model<IJob>('Job', JobSchema);

export default Job;