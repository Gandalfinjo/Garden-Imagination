import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Appointment = new Schema(
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
        datetime: {
            type: String,
            required: true
        },
        squareMeters: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        poolSquareMeters: Number,
        greenSquareMeters: Number,
        chillSquareMeters: Number,
        fountainSquareMeters: Number,
        tables: Number,
        chairs: Number,
        shortDescription: String,
        services: Array,
        status: String,
        decorator: String,
        rejectionComment: String,
        finishedDateTime: String,
        photo: String,
        maintenanceStart: String,
        maintenanceEnd: String,
        layout: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Appointment", Appointment, "appointments");