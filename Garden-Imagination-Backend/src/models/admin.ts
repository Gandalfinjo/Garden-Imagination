import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    id: number;
    username: string;
    password?: string;
};

const AdminSchema = new Schema<IAdmin>(
    {
        id: {
            type: Number,
            default: 0,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema, "admins");