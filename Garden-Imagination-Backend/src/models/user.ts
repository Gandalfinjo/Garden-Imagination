import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id: number;
    username: string;
    password?: string;
    firstname: string;
    lastname: string;
    type: "owner" | "decorator";
    gender: "M" | "F" | "Other";
    address: string;
    contact: string;
    email: string;
    profilePicture?: string;
    creditCard: string;
    status: "active" | "deactivated"
    createdAt?: Date;
    updatedAt?: Date; 
};

const UserSchema = new Schema<IUser>(
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
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["owner", "decorator"],
            required: true,
        },
        gender: {
            type: String,
            enum: ["M", "F", "Other"],
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
        },
        profilePicture: {
            type: String,
            default: "",
        },
        creditCard: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "deactivated"],
            default: "active",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>("User", UserSchema, "users");