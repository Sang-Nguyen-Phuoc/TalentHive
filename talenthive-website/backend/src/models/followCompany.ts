import { model, Schema, Types } from "mongoose";

export interface IFollowCompany {
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
    companyId?: Types.ObjectId;
    followedAt?: Date;
}

const FollowCompanySchema = new Schema<IFollowCompany>({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    companyId: { type: Types.ObjectId, ref: 'Company', required: true },
    followedAt: { type: Date, default: Date.now },
});

const FollowCompany = model<IFollowCompany>('FollowCompany', FollowCompanySchema);

export default FollowCompany;