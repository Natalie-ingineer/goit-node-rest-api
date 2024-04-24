import nodemailer from "nodemailer";
import dotevn from "dotenv";

dotevn.config();

const { PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "musienkon@meta.ua",
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  const email = { ...data, from: "musienkon@meta.ua" };
  await transporter.sendMail(email);
  return true;
};
