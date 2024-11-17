import { model, Schema, Types } from "mongoose";
import validator from "validator";
import Image from "./image";

export interface ICompany {
    _id: Types.ObjectId;
    name: string;
    avatar?: Types.ObjectId | undefined;
    locations: string[];
    industry: string;
    address: string;
    website?: string;
    employers?: [Types.ObjectId];
    admin_approved: boolean;
    created_at: Date;
    updated_at: Date;
    company_manager: Types.ObjectId;
}

const CompanySchema = new Schema<ICompany>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
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
        validate: [validator.isURL, 'Invalid URL' ]
    },
    employers: {
        type: [Schema.Types.ObjectId]
    },
    admin_approved: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
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