import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import userRouter from "./routers/user.router";
import adminRouter from "./routers/admin.router";
import firmRouter from "./routers/firm.router";
import commentRouter from "./routers/comment.router";
import appointmentRouter from "./routers/appointment.router";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// database
mongoose.connect("mongodb://127.0.0.1:27017/garden_imagination");

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Successfully connected to the database.");
});

// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => { 
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// router
const router = express.Router();

router.use("/users", upload.single("profilePicture"), userRouter);
router.use("/admins", adminRouter);
router.use("/firms", firmRouter);
router.use("/comments", commentRouter);
router.use("/appointments", upload.single("photo"), appointmentRouter);

app.use("/", router);
app.listen(4000, () => console.log("Express server running on port 4000"));