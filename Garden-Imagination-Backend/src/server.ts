import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import userRouter from "./routers/user.router";
import adminRouter from "./routers/admin.router";
import firmRouter from "./routers/firm.router";
import commentRouter from "./routers/comment.router";
import appointmentRouter from "./routers/appointment.router";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/garden_imagination";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// database
mongoose.connect(MONGO_URI);

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
const apiRouter = express.Router();

apiRouter.use("/users", upload.single("profilePicture"), userRouter);
apiRouter.use("/admins", adminRouter);
apiRouter.use("/firms", firmRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/appointments", upload.single("photo"), appointmentRouter);

app.use("/", apiRouter);

// Global Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[Error] ${err.stack || err.message}`);
    res.status(500).json({
        success: false,
        error: err.message || "Internal Server Error!"
    });
});

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to the database.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer();