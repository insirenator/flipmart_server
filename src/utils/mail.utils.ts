import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { config } from "dotenv";
config();

import { generateAccessToken } from "./jwt.utils";

const configuration = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(configuration);

const MailGenerator = new Mailgen({
  theme: "salted",
  product: {
    name: "FlipMart",
    link: "https://flipmart.in",
  },
});

export async function sendOTPMail(user: {
  name: string;
  email: string;
  otp: string;
}) {
  const response = {
    body: {
      name: user.name,
      title: user.otp,
      intro:
        "This is the OTP for you Flipmart account. It will expire in 10 minutes",
      outro: "Thanks for registering😁",
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: process.env.GMAIL_APP_EMAIL,
    to: user.email,
    subject: "OTP for your FlipMart Account",
    html: mail,
  };

  await transporter.sendMail(message);
}
