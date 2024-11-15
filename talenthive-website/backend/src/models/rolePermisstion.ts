import { Schema, Types, model } from "mongoose";


export interface IRolePermisstion {
    _id: Types.ObjectId;
    role_id: Types.ObjectId;
    permission_id: Types.ObjectId;
}

const RolePermisstionSchema = new Schema<IRolePermisstion>({
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,

    },
    permission_id: {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
    }
})

const RolePermisstion = model<IRolePermisstion>('RolePermisstion', RolePermisstionSchema);

export default RolePermisstion;