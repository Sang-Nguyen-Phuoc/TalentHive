import { model, Schema, Types } from "mongoose";

export interface IFollowCompany {
    _id?: Types.ObjectId;
    user_id?: Types.ObjectId;
    company_id?: Types.ObjectId;
    followedAt?: Date;
}

const FollowCompanySchema = new Schema<IFollowCompany>({
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    company_id: { type: Types.ObjectId, ref: 'Company', required: true },
    followedAt: { type: Date, default: Date.now },
});

const FollowCompany = model<IFollowCompany>('FollowCompany', FollowCompanySchema);

export default FollowCompany;