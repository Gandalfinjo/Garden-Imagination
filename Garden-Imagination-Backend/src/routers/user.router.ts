import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { upload } from "../config/multer.config";

const userRouter = Router();
const controller = new UserController();

// --- Authentication & Account Lifecycle ---
userRouter.post("/register", upload.single("profilePicture"), controller.register);
userRouter.post("/login", controller.login);

// --- Validation & Search Queries ---
userRouter.get("/check-username", controller.existsByUsername);
userRouter.get("/check-credentials", controller.existsByUsernameOrEmail);
userRouter.get("/by-username/:username", controller.getByUsername);

// --- Stats & Collections ---
userRouter.get("/owners", controller.getAllOwners);
userRouter.get("/owners/count", controller.getOwnersCount);
userRouter.get("/decorators", controller.getAllDecorators);
userRouter.get("/decorators/count", controller.getDecoratorsCount);

// --- Account Status Controls ---
userRouter.patch("/:id/activate", controller.activateUser);
userRouter.patch("/:id/deactivate", controller.deactivateUser);

// --- User Profile Updates ---
userRouter.patch("/change-password", controller.changePassword);
userRouter.patch("/:id/username", controller.changeUsername);
userRouter.patch("/:id/firstname", controller.changeFirstname);
userRouter.patch("/:id/lastname", controller.changeLastname);
userRouter.patch("/:id/gender", controller.changeGender);
userRouter.patch("/:id/address", controller.changeAddress);
userRouter.patch("/:id/contact", controller.changeContact);
userRouter.patch("/:id/email", controller.changeEmail);
userRouter.patch("/:id/credit-card", controller.changeCreditCard);
userRouter.patch(
    "/:id/profile-picture",
    upload.single("profilePicture"),
    controller.changeProfilePicture
);

export default userRouter;