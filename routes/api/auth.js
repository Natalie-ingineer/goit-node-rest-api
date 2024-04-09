import express from "express";

import validateBody from "../../helpers/validateBody.js";
import { registerSchema } from "../../db/user.js";

import { register } from "../../controllers/auth.js";

export const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
