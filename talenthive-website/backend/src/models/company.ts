import { model, Schema, Types } from "mongoose";
import bcryptjs from "bcryptjs";

export interface ICompany {
    _id?: Types.ObjectId;
    name?: string;
    avatar?: string;
    introduction?: string;
    industry?: string;
    addresses?: string[];
    website?: string;
    employers?: Types.ObjectId[];
    admin_approved?: boolean;
    created_at?: Date;
    updated_at?: Date;
    company_manager?: Types.ObjectId;
    accession_code?: string;
}

const CompanySchema = new Schema<ICompany>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: String,
    introduction: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        required: true
    },
    addresses: {
        type: [String],
        required: true
    },
    website: {
        type: String,
    },
    employers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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
        ref: 'User'
    }, 
    accession_code: {
        type: String,
        default: bcryptjs.hashSync(Date.now().toString(), 10)
    }

})


const Company = model<ICompany>('Company', CompanySchema);

export default Company;