import { Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment";

export class AppointmentController {
    // --- General Appointments Lifecycle ---
    makeAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const maxIdApp = await Appointment.findOne().sort({ id: -1 });
            const newId = maxIdApp ? maxIdApp.id + 1 : 1;

            const { id, ...appointmentData } = req.body;
            const photo = req.file?.filename || "";

            const newAppointment = new Appointment({
                id: newId,
                photo,
                ...appointmentData,
            });

            const savedAppointment = await newAppointment.save();
            return res.status(201).json(savedAppointment);
        } catch (error) {
            next(error);
        }
    };

    cancelAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointmentId = req.params.id;

            if (!appointmentId) {
                return res.status(400).json({ message: "Appointment ID is required." });
            }

            const result = await Appointment.deleteOne({ id: appointmentId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Appointment not found." });
            }

            return res.status(200).json({ message: "Successfully cancelled the appointment." });
        } catch (error) {
            next(error);
        }
    };

    acceptAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const updatedAppointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                { decorator: req.body.decorator, status: "accepted" },
                { new: true }
            );
            return res.status(200).json(updatedAppointment);
        } catch (error) {
            next(error);
        }
    };

    declineAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const updatedAppointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                {
                decorator: req.body.decorator,
                status: "declined",
                rejectionComment: req.body.rejectionComment,
                },
                { new: true }
            );
            return res.status(200).json(updatedAppointment);
        } catch (error) {
            next(error);
        }
    };

    finishAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                { status: "finished", finishedDateTime: req.body.finished },
                { new: true }
            );
            return res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    attachPhoto = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                { photo: req.file?.filename },
                { new: true }
            );
            return res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    // --- User-Specific Appointments ---
    getCurrentUserAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const now = new Date().toISOString();
            const appointments = await Appointment.find({
                user: req.params.user,
                datetime: { $gte: now },
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getPastUserAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const now = new Date().toISOString();
            const appointments = await Appointment.find({
                user: req.params.user,
                datetime: { $lt: now },
            }).sort({ datetime: -1 });

            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getOwnerFinishedAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                user: req.params.owner,
                status: "finished",
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    // --- Firm-Specific Appointments ---
    getFirmPendingAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                firmId: req.params.firmId,
                status: "pending",
            }).sort({ datetime: 1 });

            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getBusyDecorators = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const rawDateTime = (req.query.datetime as string) || (req.params.datetime as string);
            const datetime = new Date(rawDateTime);
            const twoHoursInMs = 2 * 60 * 60 * 1000;

            const start = new Date(datetime.getTime());
            const end = new Date(datetime.getTime() + 2 * twoHoursInMs);

            const appointments = await Appointment.find({
                firmId: req.params.firmId,
                $or: [
                { datetime: { $gte: start.toISOString(), $lte: end.toISOString() } },
                {
                    $and: [
                    { maintenanceStart: { $lte: start.toISOString() } },
                    { maintenanceEnd: { $gte: start.toISOString() } },
                    ],
                },
                ],
            });

            const decorators = [
                ...new Set(
                appointments
                    .map((app) => app.decorator)
                    .filter((decorator): decorator is string => Boolean(decorator))
                ),
            ];

            return res.status(200).json(decorators);
        } catch (error) {
            next(error);
        }
    };

    getDailyAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const now = new Date();
            const startDate = new Date(now.setMonth(now.getMonth() - 24));
            const firmId = Number(req.params.firmId);

            const appointments = await Appointment.find({
                datetime: { $gte: startDate.toISOString() },
                firmId: firmId,
            }).exec();

            const dayOfWeekCounts = new Array(7).fill(0);

            appointments.forEach((appointment) => {
                const dayOfWeek = new Date(appointment.datetime).getDay();
                dayOfWeekCounts[dayOfWeek]++;
            });

            const totalDays = 24 * 30;
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            const histogramData = dayOfWeekCounts.map((count, index) => ({
                day: dayNames[index],
                avgJobs: count / totalDays,
            }));

            return res.status(200).json(histogramData);
        } catch (error) {
            next(error);
        }
    };

    // --- Decorator-Specific Appointments ---
    getDecoratorAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({ decorator: req.params.decorator });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getDecoratorAcceptedAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                decorator: req.params.decorator,
                status: "accepted",
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getDecoratorFinishedAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                decorator: req.params.decorator,
                status: "finished",
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getDecoratorMonthlyAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const month = req.params.month || (req.query.month as string);
            const appointments = await Appointment.find({ decorator: req.params.decorator });

            const filteredApps = appointments.filter((appointment) => {
                const m = appointment.datetime.split("-")[1];
                return m === month;
            });

            return res.status(200).json(filteredApps.length);
        } catch (error) {
            next(error);
        }
    };

    getDecoratorMaintenance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                status: "Pending maintenance",
                decorator: req.params.decorator,
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    // --- Analytics & Statistics ---
    getAppointmentsLast24Hours = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const date = new Date();
            date.setDate(date.getDate() - 1);

            const count = await Appointment.countDocuments({ createdAt: { $gte: date } });
            return res.status(200).json(count);
        } catch (error) {
            next(error);
        }
    };

    getAppointmentsLast7Days = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const date = new Date();
            date.setDate(date.getDate() - 7);

            const count = await Appointment.countDocuments({ createdAt: { $gte: date } });
            return res.status(200).json(count);
        } catch (error) {
            next(error);
        }
    };

    getAppointmentsLast30Days = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const date = new Date();
            date.setDate(date.getDate() - 30);

            const count = await Appointment.countDocuments({ createdAt: { $gte: date } });
            return res.status(200).json(count);
        } catch (error) {
            next(error);
        }
    };

    getTotalDecoratedGardens = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const count = await Appointment.countDocuments({
                $or: [
                { status: "finished" },
                { status: "Pending maintenance" },
                { status: "Under maintenance" },
                ],
            });
            return res.status(200).json(count);
        } catch (error) {
            next(error);
        }
    };

    getLastThreeFinishedAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                photo: { $ne: "" },
                finishedDateTime: { $ne: "" },
            })
                .sort({ finishedDateTime: -1 })
                .limit(3);

            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    // --- Maintenance Workflow ---
    getAppointmentsMaintenance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointments = await Appointment.find({
                $or: [{ status: "Under maintenance" }, { status: "Pending maintenance" }],
            });
            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    requestMaintenance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                { status: req.body.status, maintenanceStart: req.body.maintenanceStart },
                { new: true }
            );
            return res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    acceptMaintenance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                {
                status: "Under maintenance",
                maintenanceStart: req.body.maintenanceStart,
                maintenanceEnd: req.body.maintenanceEnd,
                },
                { new: true }
            );
            return res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    rejectMaintenance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const appointment = await Appointment.findOneAndUpdate(
                { id: req.params.id },
                { status: "finished", maintenanceStart: "" },
                { new: true }
            );
            return res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    // --- Media Audit Queries ---
    getNotAttachedPhotoAppointments = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const now = new Date();
            const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            dayAgo.setHours(dayAgo.getHours() + 2);
            const dayAgoISO = dayAgo.toISOString();

            const appointments = await Appointment.find({
                status: { $in: ["finished", "Under maintenance", "Pending maintenance"] },
                finishedDateTime: { $lte: dayAgoISO },
                photo: "",
            });

            return res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };
}