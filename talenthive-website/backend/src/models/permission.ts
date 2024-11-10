import { Schema, Types, model } from "mongoose";

export interface IPermission {
    _id: Types.ObjectId;
    name: string;
    description: string;
    method: string;
    url_pattern: string;
}

const PermissionSchema = new Schema<IPermission>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    url_pattern: {
        type: String,
        required: true
    }
});

const Permission = model<IPermission>('Permission', PermissionSchema);

export default Permission;
