import { model, Schema, Types } from "mongoose";
import validator from "validator";

export interface ICompany {
    _id: Types.ObjectId;
    name: string;
    avatar: object;
    locations: [string];
    industry: string;
    address: string;
    website: string;
    employers: [Types.ObjectId];
    admin_approved: boolean;
    created_at: Date;
    company_manager: Types.ObjectId;
}

const CompanySchema = new Schema<ICompany>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: Object,
        required: true,
    },
    locations: {
        type: [String],
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true,
        validate: [validator.isURL, 'Invalid URL' ]
    },
    employers: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    admin_approved: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    company_manager: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'EmployerProfile'
    }
})

const Company = model<ICompany>('Company', CompanySchema);

export default Company;