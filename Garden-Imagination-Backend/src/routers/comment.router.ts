import express from "express";
import { CommentController } from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.route("/getAverageGrade/:firmId").get(
    (req, res) => new CommentController().getAverageGrade(req, res)
);

commentRouter.route("/getFirmComments/:firmId").get(
    (req, res) => new CommentController().getFirmComments(req, res)
);

commentRouter.route("/getAppointmentComment/:id").get(
    (req, res) => new CommentController().getAppointmentComment(req, res)
);

commentRouter.route("/leaveComment").post(
    (req, res) => new CommentController().leaveComment(req, res)
);

export default commentRouter;