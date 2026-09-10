import { Schema } from "mongoose";

export interface IService {
    service: string;
    price: number;
};

export const ServiceSchema = new Schema<IService>(
    {
        service: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { _id: false }
);