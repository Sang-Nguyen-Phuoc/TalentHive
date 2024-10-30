import { model, Schema, Types } from "mongoose";

interface IRole {
    _id: Types.ObjectId;
    name: string;
    description: string;
}

const RoleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
});

const Role = model<IRole>('Role', RoleSchema);

export default Role;