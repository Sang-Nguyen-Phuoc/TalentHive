import { model, Schema, Types } from "mongoose";

export interface ILog {
    _id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    action: string;
    timestamp: Date;
}

const logSchema = new Schema<ILog>({
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Log = model<ILog>("Log", logSchema);

export default Log;
