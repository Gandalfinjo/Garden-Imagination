import express from "express";
import Appointment from "../models/appointment";

export class AppointmentController {
    makeAppointment = (req: express.Request, res: express.Response) => {
        Appointment.findOne().sort({ id: -1 }).then(maxIdApp => {
            const newId = maxIdApp ? maxIdApp.id + 1 : 1;

            const { id, ...appointmentData } = req.body;

            const newAppointment = new Appointment({
                id: newId,
                ...appointmentData
            });

            newAppointment.save().then(savedAppointment => {
                res.status(201).json(savedAppointment);
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getCurrentUserAppointments = (req: express.Request, res: express.Response) => {
        const now = new Date().toISOString();

        Appointment.find({ user: req.params.user, datetime: { $gte: now }}).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getPastUserAppointments = (req: express.Request, res: express.Response) => {
        const now = new Date().toISOString();

        Appointment.find({ user: req.params.user, datetime: { $lt: now }}).sort({ datetime: -1 }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    cancelAppointment = (req: express.Request, res: express.Response) => {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(400).json({ message: "Appointment ID is required." });
        }

        Appointment.deleteOne({ id: appointmentId }).then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Appointment not found." });
            }

            res.status(200).json({ message: "Successfully cancelled the appointment." });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getFirmPendingAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ firmId: req.params.firmId, status: "pending" }).sort({ datetime: 1 }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    acceptAppointment = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { decorator: req.body.decorator, status: "accepted" }).then(updatedAppointment => {
            res.status(200).json(updatedAppointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    declineAppointment = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { decorator: req.body.decorator, status: "declined", rejectionComment: req.body.rejectionComment }).then(updatedAppointment => {
            res.status(200).json(updatedAppointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorAcceptedAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ decorator: req.params.decorator, status: "accepted" }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorFinishedAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ decorator: req.params.decorator, status: "finished" }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ decorator: req.params.decorator }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAppointmentsLast24Hours = (req: express.Request, res: express.Response) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        Appointment.countDocuments({ createdAt: { $gte: date } }).then(count => {
            res.status(200).json(count);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAppointmentsLast7Days = (req: express.Request, res: express.Response) => {
        const date = new Date();
        date.setDate(date.getDate() - 7);

        Appointment.countDocuments({ createdAt: { $gte: date } }).then(count => {
            res.status(200).json(count);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAppointmentsLast30Days = (req: express.Request, res: express.Response) => {
        const date = new Date();
        date.setDate(date.getDate() - 30);

        Appointment.countDocuments({ createdAt: { $gte: date } }).then(count => {
            res.status(200).json(count);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getTotalDecoratedGardens = (req: express.Request, res: express.Response) => {
        Appointment.countDocuments({
            $or: [
                { status: "finished" },
                { status: "Pending maintenance" },
                { status: "Under maintenance" }
            ]
        }).then(count => {
            res.status(200).json(count);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getLastThreeFinishedAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ photo: { $ne: ""}, finishedDateTime : { $ne: "" } }).sort({ finishedDateTime: -1 }).limit(3).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getOwnerFinishedAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({ user: req.params.owner, status: "finished" }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getBusyDecorators = (req: express.Request, res: express.Response) => {
        const datetime = new Date(req.params.datetime);
        const twoHoursInMs = 2 * 60 * 60 * 1000;

        const start = new Date(datetime.getTime());
        const end = new Date(datetime.getTime() + 2 * twoHoursInMs);

        Appointment.find({
            firmId: req.params.firmId,
            $or: [
                { datetime: { $gte: start.toISOString(), $lte: end.toISOString() } },
                { $and: [
                    { maintenanceStart: { $lte: start.toISOString() } },
                    { maintenanceEnd: { $gte: start.toISOString() } }
                ]}
            ]
            
        }).then(appointments => {
            const decorators = [...new Set(appointments.map(app => app.decorator).filter(decorator => decorator))];
            res.status(200).json(decorators);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    finishAppointment = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { status: "finished", finishedDateTime: req.body.finished }).then(appointment => {
            res.status(200).json(appointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    attachPhoto = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { photo: req.file?.filename }).then(appointment => {
            res.status(200).json(appointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorMonthlyAppointments = (req: express.Request, res: express.Response) => {
        const month = req.params.month;

        Appointment.find({ decorator: req.params.decorator }).then(appointments => {
            let apps: any[] = [];

            appointments.forEach(appointment => {
                let m = appointment.datetime.split("-")[1];
                if (m == month) apps.push(appointment);
            });

            res.status(200).json(apps.length);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDailyAppointments = async (req: express.Request, res: express.Response) => {
        try {
            const now = new Date();
            const startDate = new Date(now.setMonth(now.getMonth() - 24));
            const firmId = Number(req.params.firmId);
    
            const appointments = await Appointment.find({
                datetime: { $gte: startDate.toISOString() },
                firmId: firmId
            }).exec();
    
            const dayOfWeekCounts = new Array(7).fill(0);
    
            appointments.forEach(appointment => {
                const dayOfWeek = new Date(appointment.datetime).getDay();
                dayOfWeekCounts[dayOfWeek]++;
            });
    
            const totalDays = 24 * 30;
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            
            const histogramData = dayOfWeekCounts.map((count, index) => ({
                day: dayNames[index],
                avgJobs: count / totalDays
            }));
    
            res.status(200).json(histogramData);
    
        } catch (error) {
            res.status(500).json("Internal server error");
        }
    }

    requestMaintenance = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { status: req.body.status, maintenanceStart: req.body.maintenanceStart }).then(appointment => {
            res.status(200).json(appointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAppointmentsMaintenance = (req: express.Request, res: express.Response) => {
        Appointment.find({
            $or: [
                { status: "Under maintenance" },
                { status: "Pending maintenance" }
            ]
        }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorMaintenance = (req: express.Request, res: express.Response) => {
        Appointment.find({ status: "Pending maintenance", decorator: req.params.decorator }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    acceptMaintenance = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { status: "Under maintenance", maintenanceStart: req.body.maintenanceStart, maintenanceEnd: req.body.maintenanceEnd }).then(appointment => {
            res.status(200).json(appointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    rejectMaintenance = (req: express.Request, res: express.Response) => {
        Appointment.findOneAndUpdate({ id: req.params.id }, { status: "finished", maintenanceStart: "" }).then(appointment => {
            res.status(200).json(appointment);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getNotAttachedPhotoAppointments = (req: express.Request, res: express.Response) => {
        const now = new Date();
        const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        dayAgo.setHours(dayAgo.getHours() + 2);
        const dayAgoISO = dayAgo.toISOString();

        Appointment.find({
            status: { $in: ["finished", "Under maintenance", "Pending maintenance"] },
            finishedDateTime: { $lte: dayAgoISO },
            photo: ""
        }).then(appointments => {
            res.status(200).json(appointments);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
}