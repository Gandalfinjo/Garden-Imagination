import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        user: {
            type: String,
            required: true
        },
        firmId: {
            type: Number,
            required: true
        },
        appointmentId: {
            type: Number,
            required: true
        },
        comment: String,
        grade: Number
    }
);

export default mongoose.model("Comment", Comment, "comments");