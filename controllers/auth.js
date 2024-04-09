import { User } from "../db/user.js";

import { catchAsync } from "../helpers/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
  });
});
