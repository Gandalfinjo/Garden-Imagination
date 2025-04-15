import express from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const appointmentRouter = express.Router();

appointmentRouter.route("/makeAppointment").post(
    (req, res) => new AppointmentController().makeAppointment(req, res)
);

appointmentRouter.route("/getCurrentUserAppointments/:user").get(
    (req, res) => new AppointmentController().getCurrentUserAppointments(req, res)
);

appointmentRouter.route("/getPastUserAppointments/:user").get(
    (req, res) => new AppointmentController().getPastUserAppointments(req, res)
);

appointmentRouter.route("/cancelAppointment/:id").delete(
    (req, res) => new AppointmentController().cancelAppointment(req, res)
);

appointmentRouter.route("/getFirmPendingAppointments/:firmId").get(
    (req, res) => new AppointmentController().getFirmPendingAppointments(req, res)
);

appointmentRouter.route("/acceptAppointment/:id").put(
    (req, res) => new AppointmentController().acceptAppointment(req, res)
);

appointmentRouter.route("/declineAppointment/:id").put(
    (req, res) => new AppointmentController().declineAppointment(req, res)
);

appointmentRouter.route("/getDecoratorAcceptedAppointments/:decorator").get(
    (req, res) => new AppointmentController().getDecoratorAcceptedAppointments(req, res)
);

appointmentRouter.route("/getDecoratorFinishedAppointments/:decorator").get(
    (req, res) => new AppointmentController().getDecoratorFinishedAppointments(req, res)
);

appointmentRouter.route("/getDecoratorAppointments/:decorator").get(
    (req, res) => new AppointmentController().getDecoratorAppointments(req, res)
);

appointmentRouter.route("/getAppointmentsLast24Hours").get(
    (req, res) => new AppointmentController().getAppointmentsLast24Hours(req, res)
);

appointmentRouter.route("/getAppointmentsLast7Days").get(
    (req, res) => new AppointmentController().getAppointmentsLast7Days(req, res)
);

appointmentRouter.route("/getAppointmentsLast30Days").get(
    (req, res) => new AppointmentController().getAppointmentsLast30Days(req, res)
);

appointmentRouter.route("/getTotalDecoratedGardens").get(
    (req, res) => new AppointmentController().getTotalDecoratedGardens(req, res)
);

appointmentRouter.route("/getLastThreeFinishedAppointments").get(
    (req, res) => new AppointmentController().getLastThreeFinishedAppointments(req, res)
);

appointmentRouter.route("/getOwnerFinishedAppointments/:owner").get(
    (req, res) => new AppointmentController().getOwnerFinishedAppointments(req, res)
);

appointmentRouter.route("/getBusyDecorators/:firmId/:datetime").get(
    (req, res) => new AppointmentController().getBusyDecorators(req, res)
);

appointmentRouter.route("/finishAppointment/:id").put(
    (req, res) => new AppointmentController().finishAppointment(req, res)
);

appointmentRouter.route("/attachPhoto/:id").put(
    (req, res) => new AppointmentController().attachPhoto(req, res)
);

appointmentRouter.route("/getDecoratorMonthlyAppointments/:decorator/:month").get(
    (req, res) => new AppointmentController().getDecoratorMonthlyAppointments(req, res)
);

appointmentRouter.route("/getDailyAppointments/:firmId").get(
    (req, res) => new AppointmentController().getDailyAppointments(req, res)
);

appointmentRouter.route("/requestMaintenance/:id").put(
    (req, res) => new AppointmentController().requestMaintenance(req, res)
);

appointmentRouter.route("/getAppointmentsMaintenance").get(
    (req, res) => new AppointmentController().getAppointmentsMaintenance(req, res)
);

appointmentRouter.route("/getDecoratorMaintenance/:decorator").get(
    (req, res) => new AppointmentController().getDecoratorMaintenance(req, res)
);

appointmentRouter.route("/acceptMaintenance/:id").put(
    (req, res) => new AppointmentController().acceptMaintenance(req, res)
);

appointmentRouter.route("/rejectMaintenance/:id").put(
    (req, res) => new AppointmentController().rejectMaintenance(req, res)
);

appointmentRouter.route("/getNotAttachedPhotoAppointments").get(
    (req, res) => new AppointmentController().getNotAttachedPhotoAppointments(req, res)
);

export default appointmentRouter;