import express from "express";
import { CommentController } from "../controllers/comment.controller";

const commentRouter = express.Router();
const controller = new CommentController();

// --- Comment Lifecycle ---
commentRouter.post("/", controller.leaveComment);
commentRouter.get("/appointment/:id", controller.getAppointmentComment);

// --- Firm Feedback & Ratings ---
commentRouter.get("/firm/:firmId", controller.getFirmComments);
commentRouter.get("/firm/:firmId/average-grade", controller.getAverageGrade);

export default commentRouter;