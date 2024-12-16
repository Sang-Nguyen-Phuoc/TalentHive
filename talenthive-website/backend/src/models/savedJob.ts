import { model, Schema, Types } from "mongoose";

export interface ISavedJob {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    jobId?: Types.ObjectId;
    savedAt?: Date;
}

const SavedJobSchema = new Schema<ISavedJob>({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    jobId: { type: Types.ObjectId, ref: 'Job', required: true },
    savedAt: { type: Date, default: Date.now },
});

const SavedJob = model<ISavedJob>('SavedJob', SavedJobSchema);

export default SavedJob;