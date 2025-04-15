import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Firm = new Schema(
    {
        id: {
            type: Number,
            default: 0,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        services: Array,
        decorators: Array,
        contact: {
            type: String,
            required: true
        },
        workingHoursStart: String,
        workingHoursEnd: String,
        holidayStart: {
            type: String,
            required: true
        },
        holidayEnd: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model("Firm", Firm, "firms");