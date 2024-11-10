import { model, Schema, Types } from "mongoose";

export interface IJobType {
    _id: Types.ObjectId;
    name: string;
    description: string;
}

const JobTypeSchema = new Schema<IJobType>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
});

const JobType = model<IJobType>('JobType', JobTypeSchema);

export default JobType;