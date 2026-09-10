import mongoose, { Schema, Document } from "mongoose";
import UserSchema, { IUser } from "./user";
import { IService, ServiceSchema } from "./service";

export interface IFirm extends Document {
    id: number;
    name: string;
    address: string;
    services: IService[];
    decorators: IUser[];
    contact: string;
    workingHoursStart?: string;
    workingHoursEnd?: string;
    holidayStart: string;
    holidayEnd: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const EmbeddedUserSchema = UserSchema.schema.clone();
EmbeddedUserSchema.eachPath((path, schemaType) => {
    schemaType.options.unique = false;
});

const FirmSchema = new Schema<IFirm>(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
            address: {
            type: String,
            required: true,
            trim: true,
        },
        services: {
            type: [ServiceSchema],
            default: [],
        },
        decorators: {
            type: [EmbeddedUserSchema],
            default: [],
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        workingHoursStart: {
            type: String,
            default: "",
        },
        workingHoursEnd: {
            type: String,
            default: "",
        },
        holidayStart: {
            type: String,
            required: true,
        },
        holidayEnd: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IFirm>("Firm", FirmSchema, "firms");