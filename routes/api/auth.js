import express from "express";

import validateBody from "../../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../../models/user.js";

import { register, login } from "../../controllers/auth.js";

export const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);
