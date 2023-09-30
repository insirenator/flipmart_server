import { NextFunction, Request, Response } from "express";

import { generateAccessToken } from "../../utils/jwt.utils";

export default async function loginUserHandler(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Retrieve user from locals
    const user = res.locals.user;

    // Generate access token
    const accessToken = generateAccessToken(user);

    // Attach the access token
    user.accessToken = accessToken;

    return res.status(200).json({
      success: true,
      message: "user login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
}
