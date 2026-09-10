import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";

export class CommentController {
    // --- Comment Lifecycle ---
    leaveComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const maxIdComment = await Comment.findOne().sort({ id: -1 });
            const newId = maxIdComment ? maxIdComment.id + 1 : 1;

            const newComment = new Comment({
                id: newId,
                user: req.body.user,
                firmId: req.body.firmId,
                appointmentId: req.body.appointmentId,
                comment: req.body.comment,
                grade: req.body.grade,
            });

            const savedComment = await newComment.save();
            return res.status(201).json(savedComment);
        } catch (error) {
            next(error);
        }
    };

    getAppointmentComment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const comment = await Comment.findOne({ appointmentId: req.params.id });
            return res.status(200).json(comment);
        } catch (error) {
            next(error);
        }
    };

    // --- Firm Feedback & Ratings ---
    getFirmComments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const comments = await Comment.find({ firmId: req.params.firmId });
            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    };

    getAverageGrade = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const comments = await Comment.find({ firmId: req.params.firmId });

            if (comments.length === 0) {
                return res.status(200).json(0);
            }

            const total = comments.reduce((acc, curr) => acc + (curr.grade || 0), 0);
            const avg = total / comments.length;

            return res.status(200).json(avg);
        } catch (error) {
            next(error);
        }
    };
}