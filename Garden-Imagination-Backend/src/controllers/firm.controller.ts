import { Request, Response, NextFunction } from "express";
import Firm from "../models/firm";

export class FirmController {
    // --- Firm Management ---
    addFirm = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const maxIdFirm = await Firm.findOne().sort({ id: -1 });
            const newId = maxIdFirm ? maxIdFirm.id + 1 : 1;

            const newFirm = new Firm({
                id: newId,
                name: req.body.name,
                address: req.body.address,
                services: req.body.services,
                decorators: req.body.decorators,
                contact: req.body.contact,
                workingHoursStart: req.body.workingHoursStart,
                workingHoursEnd: req.body.workingHoursEnd,
                holidayStart: req.body.holidayStart,
                holidayEnd: req.body.holidayEnd,
            });

            const savedFirm = await newFirm.save();
            return res.status(201).json(savedFirm);
        } catch (error) {
            next(error);
        }
    };

    getAllFirms = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const firms = await Firm.find({});
            return res.status(200).json(firms);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const firm = await Firm.findOne({ id: req.params.id });

            if (!firm) {
                return res.status(404).json({ message: "Firm not found." });
            }

            return res.status(200).json(firm);
        } catch (error) {
            next(error);
        }
    };

    // --- Decorator Queries ---
    getDecoratorFirm = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const firm = await Firm.findOne({
                decorators: { $elemMatch: { username: req.params.username } },
            });

            return res.status(200).json(firm);
        } catch (error) {
            next(error);
        }
    };
}