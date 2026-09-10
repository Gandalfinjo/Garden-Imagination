import { Router } from "express";
import { FirmController } from "../controllers/firm.controller";

const firmRouter = Router();
const controller = new FirmController();

// --- Firm Management ---
firmRouter.post("/", controller.addFirm);
firmRouter.get("/", controller.getAllFirms);
firmRouter.get("/:id", controller.getById);

// --- Decorator Queries ---
firmRouter.get("/decorator/:username", controller.getDecoratorFirm);

export default firmRouter;