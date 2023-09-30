import { NextFunction, Request, Response } from "express";

import { getUserByEmail, insertUser } from "../../database/users.db";
import { hashString } from "../../utils/hashing.utils";
import { sendOTPMail } from "../../utils/mail.utils";
import { generateAccessToken } from "../../utils/jwt.utils";
import { generateOTP } from "../../utils/otp.utils";

export default async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password, address } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user is already registered" });
    }

    // Hash the password
    const hashedPassword = await hashString(password);

    // Insert User
    const createdUser = await insertUser({
      name,
      email,
      password: hashedPassword,
      address,
    });

    // Generate and Hash OTP
    const OTP = generateOTP(6);
    const hashedOTP = await hashString(OTP);

    // Create Access Token with OTP in it
    const verificationToken = generateAccessToken(
      { ...createdUser, hashedOtp: hashedOTP },
      "10m"
    ); // 10 minutes

    // Mail the OTP
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
