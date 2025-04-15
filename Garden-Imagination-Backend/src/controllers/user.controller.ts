import express from "express";
import User from "../models/user";

export class UserController {
    register = (req: express.Request, res: express.Response) => {
        User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }]}).then(user => {
            if (user) {
                if (user.username == req.body.username) {
                    return res.status(200).json({ message: "Username is already used" });
                }
                if (user.email == req.body.email) {
                    return res.status(200).json({ message: "Email is already used"});
                }
            }

            User.findOne().sort({ id: -1 }).then(maxIdUser => {
                const newId = maxIdUser ? maxIdUser.id + 1 : 1;
                const file = req.file;
                if (!file) return res.status(400).json({ message: "No file uploaded" });

                const newUser = new User({
                    id: newId,
                    username: req.body.username,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    type: req.body.type,
                    gender: req.body.gender,
                    address: req.body.address,
                    contact: req.body.contact,
                    email: req.body.email,
                    profilePicture: file.filename,
                    creditCard: req.body.creditCard,
                    status: req.body.status
                });
                
                newUser.save().then(savedUser => {
                    res.status(201).json(savedUser);
                });
            });   
        }).catch(error => {
            res.status(500).json({ message: error.message});
        });
    }

    login = (req: express.Request, res: express.Response) => {
        User.findOne({ username: req.body.username, password: req.body.password, type: req.body.type, status: "active" }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    existsByUsername = (req: express.Request, res: express.Response) => {
        User.findOne({ username: req.body.username }).then(user => {
            if (user) return res.status(200).json({ user: user });
            else return res.status(200).json({ message: "Username doesn't exist" });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    existsByUsernameOrEmail = (req: express.Request, res: express.Response) => {
        User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }]}).then(user => {
            if (user) {
                if (user.username == req.body.username) {
                    return res.status(200).json({ message: "Username is already used" });
                }
                if (user.email == req.body.email) {
                    return res.status(200).json({ message: "Email is already used"});
                }
            }
            else {
                return res.status(200).json({ message: "Unique username and email" });
            }
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getByUsername = (req: express.Request, res: express.Response) => {
        User.findOne({ username: req.body.username }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAllOwners = (req: express.Request, res: express.Response) => {
        User.find({ type: "owner" }).then(users => {
            res.status(200).json(users);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getOwnersCount = (req: express.Request, res: express.Response) => {
        User.find({ type: "owner" }).then(users => {
            res.status(200).json(users.length);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getAllDecorators = (req: express.Request, res: express.Response) => {
        User.find({ type: "decorator" }).then(users => {
            res.status(200).json(users);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    getDecoratorsCount = (req: express.Request, res: express.Response) => {
        User.find({ type: "decorator" }).then(users => {
            res.status(200).json(users.length);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    activateUser = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { status: "active" }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    deactivateUser = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { status: "deactivated" }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeUsername = (req: express.Request, res: express.Response) => {
        User.findOne({ username: req.body.username }).then(user => {
            if (user) {
                return res.status(200).json({ message: "Username is already used" });
            }
            User.findOneAndUpdate({ id: req.params.id }, { username: req.body.username }).then(user => {
                res.status(200).json(user);
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ username: req.body.username }, { password: req.body.password }).then(user => {
            if (!user) res.status(200).json({ message: "Username doesn't exist" });
            else res.status(201).json({ user: user });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeFirstname = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { firstname: req.params.firstname }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeLastname = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { lastname: req.params.lastname }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
    
    changeGender = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { gender: req.params.gender }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }
    
    changeAddress = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { address: req.params.address }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeContact = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { contact: req.params.contact }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeEmail = (req: express.Request, res: express.Response) => {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(200).json({ message: "Email is already used" });
            }
            User.findOneAndUpdate({ id: req.params.id }, { email: req.body.email }).then(user => {
                res.status(200).json(user);
            });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeProfilePicture = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { profilePicture: req.file?.filename }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

    changeCreditCard = (req: express.Request, res: express.Response) => {
        User.findOneAndUpdate({ id: req.params.id }, { creditCard: req.body.creditCard }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });
    }

}