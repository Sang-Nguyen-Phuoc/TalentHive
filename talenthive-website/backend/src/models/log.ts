import { model, Schema, Types } from "mongoose";

export const LOG_ACTIONS = {
    LOGIN: "LOGIN",
    // LOGOUT: "LOGOUT",
    POST_JOB: "POST_JOB",
    UPDATE_JOB: "UPDATE_JOB",
    DELETE_JOB: "DELETE_JOB",
    APPROVE_JOB: "APPROVE_JOB",
    REJECT_JOB: "REJECT_JOB",
    CREATE_COMPANY: "CREATE_COMPANY",
    UPDATE_COMPANY: "UPDATE_COMPANY",
    // DELETE_COMPANY: "DELETE_COMPANY",
    JOIN_COMPANY: "JOIN_COMPANY",
    // LEAVE_COMPANY: "LEAVE_COMPANY",
    APPLY_JOB: "APPLY_JOB",
    ACCEPT_APPLICATION: "ACCEPT_APPLICATION",
    REJECT_APPLICATION: "REJECT_APPLICATION",
    DELETE_APPLICATION: "DELETE_APPLICATION",
    UPDATE_APPLICATION: "UPDATE_APPLICATION",
    POST_APPLICATION: "POST_APPLICATION",
    // FOLLOW_COMPANY: "FOLLOW_COMPANY",
    // UNFOLLOW_COMPANY: "UNFOLLOW_COMPANY",
    CREATE_ADMIN: "CREATE_ADMIN",
    LOCK_USER: "LOCK_USER",
    UNLOCK_USER: "UNLOCK_USER",
    // DELETE_USER: "DELETE_USER",
};

export interface ILog {
    _id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    details?: any;
    action: string;
    timestamp: Date;
    ip?: string;
    user_agent?: string;
}

const logSchema = new Schema<ILog>({
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    details: { type: Schema.Types.Mixed },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ip: { type: String },
    user_agent: { type: String },
});

const Log = model<ILog>("Log", logSchema);

export default Log;
