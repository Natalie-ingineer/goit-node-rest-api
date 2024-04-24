import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotevn from "dotenv";
import nodemailer from "nodemailer";

import contactsRouter from "./routes/api/contactsRouter.js";

import { router } from "./routes/api/auth.js";

const app = express();

dotevn.config();

const { DB_HOST, PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "musienkon@meta.ua",
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const emailOptions = {
  from: "musienkon@meta.ua",
  to: "noresponse@gmail.com",
  subject: "Nodemailer test",
  text: "Привіт. Ми тестуємо надсилання листів!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);

app.use("/users", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
