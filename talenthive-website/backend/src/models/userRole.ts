import { Schema, Types, model } from 'mongoose';

export interface IUserRole {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    role_id: Types.ObjectId;
}

const UserRoleSchema = new Schema<IUserRole>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
})

const UserRole = model<IUserRole>('UserRole', UserRoleSchema);

export default UserRole;