import { model, Schema, Types } from "mongoose";

export interface IJobCategory {
    _id: Types.ObjectId;
    name: string;
    description: string;
}


/**
 * Job Categories:
 * 
 * Information Technology (IT) – Software Developer, 
 * Data Analyst, 
 * Cybersecurity Specialist, 
 * Network Administrator, 
 * IT Support Technician; 
 * Healthcare and Medical – Registered Nurse, 
 * Medical Doctor, Pharmacist,
 * Medical Laboratory Technician,
 */

const JobCategorySchema = new Schema<IJobCategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

const JobCategory = model<IJobCategory>('JobCategory', JobCategorySchema);

export default JobCategory;