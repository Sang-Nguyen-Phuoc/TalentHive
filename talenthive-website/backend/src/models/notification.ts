import { model, Schema, Types } from "mongoose";

export interface INotification {
    _id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    type?: string;
    content?: string;
    is_read?: boolean;
    created_at?: Date;
}

const notificationSchema = new Schema<INotification>({
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["job_update", "company_post", "general"], required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
