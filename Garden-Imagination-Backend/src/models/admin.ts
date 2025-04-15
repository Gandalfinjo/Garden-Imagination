import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Admin = new Schema(
    {
        id: {
            type: Number,
            default: 0,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    }
);

export default mongoose.model("Admin", Admin, "admins");