import express from "express";
import Comment from "../models/comment";

export class CommentController {
    getAverageGrade = (req: express.Request, res: express.Response) => {
        Comment.find({ firmId: req.params.firmId }).then(comments => {
            let total: number = 0.0;
            let avg: number = 0.0;

            if (comments.length != 0) {
                for (let i = 0; i < comments.length; i++) {
                    total += comments[i].grade!;
                }

                avg = total / comments.length;
            }

            res.status(200).json(avg);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getFirmComments = (req: express.Request, res: express.Response) => {
        Comment.find({ firmId: req.params.firmId }).then(comments => {
            res.status(201).json(comments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAppointmentComment = (req: express.Request, res: express.Response) => {
        Comment.findOne({ appointmentId: req.params.id }).then(comment => {
            res.status(201).json(comment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    leaveComment = (req:express.Request, res: express.Response) => {
        Comment.findOne().sort({ id: -1 }).then(maxIdComment => {
            const newId = maxIdComment ? maxIdComment.id + 1 : 1;

            const newComment = new Comment({
                id: newId,
                user: req.body.user,
                firmId: req.body.firmId,
                appointmentId: req.body.appointmentId,
                comment: req.body.comment,
                grade: req.body.grade
            });

            newComment.save().then(savedComment => {
                res.status(200).json(savedComment);
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
}