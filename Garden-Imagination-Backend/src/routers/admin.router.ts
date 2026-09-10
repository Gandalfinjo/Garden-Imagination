import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const adminRouter = Router();
const controller = new AdminController();

// --- Admin Authentication ---
adminRouter.post("/login", controller.login);

export default adminRouter;