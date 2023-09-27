import { NextFunction, Request, Response } from "express";

export default async function verifyUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jwtPayload } = res.locals;
    const { otp } = req.body;

    if (jwtPayload.otp !== otp) {
      throw {
        status: 401,
        msg: "otp mismatch: provided otp and token otp do not match",
      };
    }

    /*
      TODO:
      - Set the verified field of the user in db to true

    */

    return res
      .status(200)
      .json({ success: true, message: "user verification successful" });
  } catch (error) {
    next(error);
  }
}
