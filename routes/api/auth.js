import express from "express";

import { validateBody } from "../../helpers/validateBody.js";
import { registerSchema } from "../../db/user.js";

authRouter.post("/register", validateBody(registerSchema));

export const authRouter = express.Router();
