import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export class UserController {
    // --- Authentication & Account Lifecycle ---
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, email } = req.body;

            const existingUser = await User.findOne({
                $or: [{ username }, { email }],
            });

            if (existingUser) {
                if (existingUser.username === username) {
                    res.status(409).json({ message: "Username is already in use" });
                    return;
                }
                if (existingUser.email === email) {
                    res.status(409).json({ message: "Email is already in use" });
                    return;
                }
            }

            if (!req.file) {
                res.status(400).json({ message: "Profile picture file is required" });
                return;
            }

            const maxIdUser = await User.findOne().sort({ id: -1 });
            const newId = maxIdUser ? maxIdUser.id + 1 : 1;

            const newUser = new User({
                ...req.body,
                id: newId,
                profilePicture: req.file.filename,
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, password, type } = req.body;
            const user = await User.findOne({ username, password, type, status: "active" });

            if (!user) {
                res.status(401).json({ message: "Invalid credentials or account inactive" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    // --- Validation & Search Queries ---
    existsByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const username = (req.query.username as string) || req.body.username;
            const user = await User.findOne({ username });

            if (!user) {
                res.status(404).json({ message: "Username does not exist" });
                return;
            }

            res.status(200).json({ exists: true, user });
        } catch (error) {
            next(error);
        }
    };

    existsByUsernameOrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, email } = req.query;
            const user = await User.findOne({
                $or: [
                    { username: username as string },
                    { email: email as string },
                ],
            });

            if (user) {
                if (user.username === username) {
                    res.status(409).json({ message: "Username is already used" });
                    return;
                }
                if (user.email === email) {
                    res.status(409).json({ message: "Email is already used" });
                    return;
                }
            }

            res.status(200).json({ message: "Unique username and email" });
        } catch (error) {
            next(error);
        }
    };

    getByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    // --- Stats & Collections ---
    getAllOwners = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await User.find({ type: "owner" });
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    getOwnersCount = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const count = await User.countDocuments({ type: "owner" });
            res.status(200).json({ count });
        } catch (error) {
            next(error);
        }
    };

    getAllDecorators = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await User.find({ type: "decorator" });
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    getDecoratorsCount = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const count = await User.countDocuments({ type: "decorator" });
            res.status(200).json({ count });
        } catch (error) {
            next(error);
        }
    };

    // --- Account Status Controls ---
    activateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { status: "active" },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    deactivateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { status: "deactivated" },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    // --- User Profile Updates ---
    changeUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username } = req.body;
            const existing = await User.findOne({ username });

            if (existing) {
                res.status(409).json({ message: "Username is already used" });
                return;
            }

            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { username },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, password } = req.body;
            const user = await User.findOneAndUpdate(
                { username },
                { password },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "Username does not exist" });
                return;
            }

            res.status(200).json({ message: "Password updated successfully", user });
        } catch (error) {
            next(error);
        }
    };

    changeFirstname = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { firstname: req.body.firstname },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeLastname = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { lastname: req.body.lastname },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeGender = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { gender: req.body.gender },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { address: req.body.address },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { contact: req.body.contact },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.body;
            const existing = await User.findOne({ email });

            if (existing) {
                res.status(409).json({ message: "Email is already used" });
                return;
            }

            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { email },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { profilePicture: req.file.filename },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    changeCreditCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await User.findOneAndUpdate(
                { id: req.params.id },
                { creditCard: req.body.creditCard },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
}