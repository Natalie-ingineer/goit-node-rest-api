import bcrypt from "bcryptjs";

// const createHashPassword = async (password) => {
//   const result = await bcrypt.hash(password, 10);
//   const compareResult = await bcrypt.compare(password, result);
// };

import { User } from "../db/user.js";
import HttpError from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
});
