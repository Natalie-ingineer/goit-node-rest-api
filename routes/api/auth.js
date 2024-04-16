import express from "express";

import validateBody from "../../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../../models/user.js";

import { register, login, getCurrent, logout } from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

export const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);
