import express from "express";
import { FirmController } from "../controllers/firm.controller";

const firmRouter = express.Router();

firmRouter.route("/addFirm").post(
    (req, res) => new FirmController().addFirm(req, res)
);

firmRouter.route("/getAllFirms").get(
    (req, res) => new FirmController().getAllFirms(req, res)
);

firmRouter.route("/getById/:id").get(
    (req, res) => new FirmController().getById(req, res)
);

firmRouter.route("/getDecoratorFirm/:username").get(
    (req, res) => new FirmController().getDecoratorFirm(req, res)
);

export default firmRouter;