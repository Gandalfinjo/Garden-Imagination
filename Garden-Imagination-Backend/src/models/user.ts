import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
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
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String,
            required: false
        },
        creditCard: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", User, "users");