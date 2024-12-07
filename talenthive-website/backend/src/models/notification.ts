import { model, Schema, Types } from "mongoose";

export interface INotification {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    type?: string;
    content?: string;
    isRead?: boolean;
    createdAt?: Date;
}

const notificationSchema = new Schema<INotification>({
    userId: { type: Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["job_update", "company_post", "general"], required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
