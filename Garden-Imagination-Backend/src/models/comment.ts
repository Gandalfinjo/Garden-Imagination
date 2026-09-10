import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    id: number;
    user: string;
    firmId: number;
    appointmentId: number;
    comment: string;
    grade: number;
    createdAt?: Date;
    updatedAt?: Date;
};

const CommentSchema = new Schema<IComment>(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        user: {
            type: String,
            required: true,
            trim: true
        },
        firmId: {
            type: Number,
            required: true
        },
        appointmentId: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            default: "",
            trim: true,
        },
        grade: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    }
);

export default mongoose.model<IComment>("Comment", CommentSchema, "comments");