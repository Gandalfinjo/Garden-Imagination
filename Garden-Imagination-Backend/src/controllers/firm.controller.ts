import express from "express";
import Firm from "../models/firm";

export class FirmController {
    addFirm = (req: express.Request, res: express.Response) => {
        Firm.findOne().sort({ id: -1 }).then(maxIdFirm => {
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
                holidayEnd: req.body.holidayEnd
            });

            newFirm.save().then(savedFirm => {
                res.status(201).json(savedFirm);
            })
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAllFirms = (req: express.Request, res: express.Response) => {
        Firm.find({}).then(firms => {
            res.status(201).json(firms);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getById = (req: express.Request, res: express.Response) => {
        Firm.findOne({ id: req.params.id }).then(firm => {
            res.status(201).json(firm);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorFirm = (req: express.Request, res: express.Response) => {
        Firm.findOne({ decorators: { $elemMatch: { username: req.params.username } } }).then(firm => {
            res.status(201).json(firm);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
}