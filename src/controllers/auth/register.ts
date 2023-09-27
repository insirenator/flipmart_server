import { NextFunction, Request, Response } from "express";

import { getUserByEmail, insertUser } from "../../database/users.db";
import { hashPassword } from "../../utils/password.utils";
import { sendOTPMail } from "../../utils/mail.utils";
import { generateAccessToken } from "../../utils/jwt.utils";
import { generateOTP } from "../../utils/otp.utils";

export default async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user is already registered" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    await insertUser({ name, email, password: hashedPassword });

    const OTP = generateOTP(6);

    const verificationToken = generateAccessToken({ otp: OTP }, "10m"); // 10 minutes

    await sendOTPMail({
      name: name as string,
      email: email as string,
      otp: OTP,
    });

    return res.status(201).json({
      success: true,
      message: "user registered!",
      verificationToken,
    });
  } catch (error) {
    next(error);
  }
}
