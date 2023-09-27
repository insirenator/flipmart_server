import { NextFunction, Request, Response } from "express";

import { getUserByEmail, insertUser } from "../database/users.db";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { generateAccessToken } from "../utils/jwt.utils";

export async function registerUserHandler(
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

    const result = await insertUser({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "user registered!",
      user: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUserHandler(
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
