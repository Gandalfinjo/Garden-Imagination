import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/register").post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route("/login").post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route("/existsByUsername").post(
    (req, res) => new UserController().existsByUsername(req, res)
);

userRouter.route("/existsByUsernameOrEmail").post(
    (req, res) => new UserController().existsByUsernameOrEmail(req, res)
);

userRouter.route("/getByUsername").post(
    (req, res) => new UserController().getByUsername(req, res)
);

userRouter.route("/getAllOwners").get(
    (req, res) => new UserController().getAllOwners(req, res)
);

userRouter.route("/getOwnersCount").get(
    (req, res) => new UserController().getOwnersCount(req, res)
);

userRouter.route("/getDecoratorsCount").get(
    (req, res) => new UserController().getDecoratorsCount(req, res)
);

userRouter.route("/getAllDecorators").get(
    (req, res) => new UserController().getAllDecorators(req, res)
);

userRouter.route("/activateUser/:id").put(
    (req, res) => new UserController().activateUser(req, res)
);

userRouter.route("/deactivateUser/:id").put(
    (req, res) => new UserController().deactivateUser(req, res)
);

userRouter.route("/changeUsername/:id").put(
    (req, res) => new UserController().changeUsername(req, res)
);

userRouter.route("/changePassword").put(
    (req, res) => new UserController().changePassword(req, res)
);

userRouter.route("/changeFirstname/:id/:firstname").put(
    (req, res) => new UserController().changeFirstname(req, res)
);

userRouter.route("/changeLastname/:id/:lastname").put(
    (req, res) => new UserController().changeLastname(req, res)
);

userRouter.route("/changeGender/:id/:gender").put(
    (req, res) => new UserController().changeGender(req, res)
);

userRouter.route("/changeAddress/:id/:address").put(
    (req, res) => new UserController().changeAddress(req, res)
);

userRouter.route("/changeContact/:id/:contact").put(
    (req, res) => new UserController().changeContact(req, res)
);

userRouter.route("/changeEmail/:id").put(
    (req, res) => new UserController().changeEmail(req, res)
);

userRouter.route("/changeProfilePicture/:id").put(
    (req, res) => new UserController().changeProfilePicture(req, res)
);

userRouter.route("/changeCreditCard/:id").put(
    (req, res) => new UserController().changeCreditCard(req, res)
);

export default userRouter;