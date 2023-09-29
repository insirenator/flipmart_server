import { NextFunction, Request, Response } from "express";
import { compareHash } from "../../utils/hashing.utils";
import { updateUserVerificationStatus } from "../../database/users.db";

export default async function verifyUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract JWT Payload and OTP
    const { jwtPayload } = res.locals;
    const { otp } = req.body;

    // Verify OTP
    const isOTPCorrect = await compareHash(otp, jwtPayload.hashedOtp);

    if (!isOTPCorrect) {
      throw {
        status: 401,
        msg: "otp mismatch: provided otp and token otp do not match",
      };
    }

    // Update user verification status in the database
    await updateUserVerificationStatus(jwtPayload.id);

    return res
      .status(200)
      .json({ success: true, message: "user verification successful" });
  } catch (error) {
    next(error);
  }
}
