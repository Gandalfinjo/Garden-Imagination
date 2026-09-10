import express from "express";
import { AdminController } from "../controllers/admin.controller";

const adminRouter = express.Router();
const controller = new AdminController();

adminRouter.post("/login", controller.login);

export default adminRouter;