import { model, Schema, Types } from "mongoose";

export interface IJob {
    _id: Types.ObjectId;
    title: string;
    company_id: Types.ObjectId;
    image: Types.ObjectId;
    employer_id: Types.ObjectId;
    salary_range: { min: number; max: number };
    salary_unit: string;
    address: string;
    description: string;
    skills: [string];
    requirements: [string];
    benefits: [string];
    expires_at: Date;
    job_type: Types.ObjectId;
    job_category: Types.ObjectId;
    is_public: boolean;
    posted_at: Date;
    status: string;
    applications_count: number;
    views: number;
    created_at: Date;
    updated_at: Date;
    location: string;
}

const JobSchema = new Schema<IJob>({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    employer_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
    },
    salary_range: {
        type: {
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
        },
    },
    salary_unit: {
        type: String,
    },
    location: {
        type: String,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
    },
    skills: {
        type: [String],
    },
    requirements: {
        type: [String],
    },
    benefits: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    posted_at: {
        type: Date,
        default: Date.now(),
    },
    expires_at: {
        type: Date,
    },
    views: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
    applications_count: {
        type: Number,
        default: 0,
    },
    job_type: {
        type: Schema.Types.ObjectId,
        ref: "JobType",
    },
    job_category: {
        type: Schema.Types.ObjectId,
        ref: "JobCategory",
    },
    is_public: {
        type: Schema.Types.Boolean,
        default: true,
    },
});

const Job = model<IJob>("Job", JobSchema);

export default Job;
