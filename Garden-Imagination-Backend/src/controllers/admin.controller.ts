import { Request, Response, NextFunction } from "express";
import Admin from "../models/admin";

export class AdminController {
    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username, password });

            if (!admin) {
                res.status(401).json({ message: "Invalid credentials or account inactive" });
                return;
            }

            res.status(200).json(admin);
        } catch (error) {
            next(error);
        }
    }
}