import mongoose, { Schema, Document } from "mongoose";
import { IService, ServiceSchema } from "./service";

export type AppointmentStatus =
    | "pending"
    | "accepted"
    | "declined"
    | "finished"
    | "Pending maintenance"
    | "Under maintenance";

export interface IAppointment extends Document {
    id: number;
    user: string;
    firmId: number;
    datetime: string;
    squareMeters: number;
    type: string;
    poolSquareMeters?: number;
    greenSquareMeters?: number;
    chillSquareMeters?: number;
    fountainSquareMeters?: number;
    tables?: number;
    chairs?: number;
    shortDescription?: string;
    services: IService[];
    status: AppointmentStatus;
    decorator?: string;
    rejectionComment?: string;
    finishedDateTime?: string;
    photo?: string;
    maintenanceStart?: string;
    maintenanceEnd?: string;
    layout?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        user: {
            type: String,
            required: true,
            trim: true,
        },
        firmId: {
            type: Number,
            required: true,
        },
        datetime: {
            type: String,
            required: true,
        },
        squareMeters: {
            type: Number,
            required: true,
            min: 0,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        poolSquareMeters: { type: Number, default: 0 },
        greenSquareMeters: { type: Number, default: 0 },
        chillSquareMeters: { type: Number, default: 0 },
        fountainSquareMeters: { type: Number, default: 0 },
        tables: { type: Number, default: 0 },
        chairs: { type: Number, default: 0 },
        shortDescription: { type: String, default: "", trim: true },
        services: {
            type: [ServiceSchema],
            default: [],
        },
        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "declined",
                "finished",
                "Pending maintenance",
                "Under maintenance",
            ],
            default: "pending",
            required: true,
        },
        decorator: { type: String, default: "", trim: true },
        rejectionComment: { type: String, default: "", trim: true },
        finishedDateTime: { type: String, default: "" },
        photo: { type: String, default: "" },
        maintenanceStart: { type: String, default: "" },
        maintenanceEnd: { type: String, default: "" },
        layout: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema, "appointments");