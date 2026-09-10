import express from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { upload } from "../config/multer.config";

const appointmentRouter = express.Router();
const controller = new AppointmentController();

// --- General Appointments Lifecycle ---
appointmentRouter.post("/", upload.single("photo"), controller.makeAppointment);
appointmentRouter.delete("/:id", controller.cancelAppointment);
appointmentRouter.patch("/:id/accept", controller.acceptAppointment);
appointmentRouter.patch("/:id/decline", controller.declineAppointment);
appointmentRouter.patch("/:id/finish", controller.finishAppointment);
appointmentRouter.patch(
    "/:id/photo",
    upload.single("photo"),
    controller.attachPhoto
);

// --- User-Specific Appointments ---
appointmentRouter.get("/user/:user/current", controller.getCurrentUserAppointments);
appointmentRouter.get("/user/:user/past", controller.getPastUserAppointments);
appointmentRouter.get("/owner/:owner/finished", controller.getOwnerFinishedAppointments);

// --- Firm-Specific Appointments ---
appointmentRouter.get("/firm/:firmId/pending", controller.getFirmPendingAppointments);
appointmentRouter.get("/firm/:firmId/busy-decorators", controller.getBusyDecorators);
appointmentRouter.get("/firm/:firmId/daily", controller.getDailyAppointments);

// --- Decorator-Specific Appointments ---
appointmentRouter.get("/decorator/:decorator", controller.getDecoratorAppointments);
appointmentRouter.get("/decorator/:decorator/accepted", controller.getDecoratorAcceptedAppointments);
appointmentRouter.get("/decorator/:decorator/finished", controller.getDecoratorFinishedAppointments);
appointmentRouter.get("/decorator/:decorator/monthly", controller.getDecoratorMonthlyAppointments);
appointmentRouter.get("/decorator/:decorator/maintenance", controller.getDecoratorMaintenance);

// --- Analytics & Statistics ---
appointmentRouter.get("/stats/last-24-hours", controller.getAppointmentsLast24Hours);
appointmentRouter.get("/stats/last-7-days", controller.getAppointmentsLast7Days);
appointmentRouter.get("/stats/last-30-days", controller.getAppointmentsLast30Days);
appointmentRouter.get("/stats/total-decorated-gardens", controller.getTotalDecoratedGardens);
appointmentRouter.get("/stats/recent-finished", controller.getLastThreeFinishedAppointments);

// --- Maintenance Workflow ---
appointmentRouter.get("/maintenance", controller.getAppointmentsMaintenance);
appointmentRouter.patch("/:id/maintenance/request", controller.requestMaintenance);
appointmentRouter.patch("/:id/maintenance/accept", controller.acceptMaintenance);
appointmentRouter.patch("/:id/maintenance/reject", controller.rejectMaintenance);

// --- Media Audit Queries ---
appointmentRouter.get("/unattached-photos", controller.getNotAttachedPhotoAppointments);

export default appointmentRouter;