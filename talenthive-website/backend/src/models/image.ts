import { model, Schema, Types } from "mongoose";

export interface IImage {
    _id: Types.ObjectId;
    originalname: string;
    data: Buffer;
    contentType: string;
}

const ImageSchema = new Schema<IImage>({
    originalname: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

const Image = model<IImage>('Image', ImageSchema);

export default Image;