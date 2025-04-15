import express from "express";
import Admin from "../models/admin";

export class AdminController {
    login = (req: express.Request, res: express.Response) => {
        Admin.findOne({ username: req.body.username, password: req.body.password }).then(admin => {
            res.status(200).json(admin);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
}