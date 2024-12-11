import { model, Schema, Types } from "mongoose";

export interface IJob {
    _id: Types.ObjectId;
    title: string;
    company_id: Types.ObjectId;
    employer_id: Types.ObjectId;
    salary_range: {min: number, max: number},
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
    is_public: boolean;
    status: string;
}

const JobSchema = new Schema<IJob>({
    title: {
        type: String,
        required: [true, "title is required"],
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
        type: {
            min: {
                type: Number,
                
            },
            max: {
                type: Number,
                
            }
        },
    },
    location: {
        type: String,
    },
    description: {
        type: String,
        trim: true
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
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    posted_at: {
        type: Date,
        default: Date.now()
    },
    expires_at: {
        type: Date,
    },
    views: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    applications_count: {
        type: Number,
        default: 0
    },
    job_type: {
        type: Schema.Types.ObjectId,
        ref: 'JobType'
    },
    job_category: {
        type: Schema.Types.ObjectId,
        ref: 'JobCategory'
    },
    is_public: {
        type: Schema.Types.Boolean,
        default: true
    }
});

const Job = model<IJob>('Job', JobSchema);

export default Job;