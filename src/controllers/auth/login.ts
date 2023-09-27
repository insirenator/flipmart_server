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
    const accessToken = generateAccessToken({
      id: user.id as number,
      name: user.name as string,
      email: user.email as string,
    });

    // Construct a sanitized user
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    };

    return res.status(200).json({
      success: false,
      message: "user login successful",
      user: sanitizedUser,
    });
  } catch (error) {
    next(error);
  }
}
