import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import crypto from "crypto";
import path from "path";
import { promises as fs } from "fs";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

import { catchAsync } from "../helpers/catchAsync.js";
import { sendEmail } from "../helpers/sendEmail.js";

dotevn.config();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(process.cwd(), "public", "avatars");

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const emailHash = crypto.createHash("md5").update(email).digest("hex");
  const avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;

  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification successful",
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10d" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
});

const avatarByJimp = async (avatarPath) => {
  const avatar = await Jimp.read(avatarPath);
  avatar.resize(250, 250).quality(90).writeAsync(avatarPath);
};

export const updateAvatar = catchAsync(async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "No file uploaded for avatar");
  }

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await avatarByJimp(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
});
