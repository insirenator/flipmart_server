import { NextFunction, Request, Response } from "express";

import { getUserByEmail, insertUser } from "../../database/users.db";
import { hashPassword } from "../../utils/password.utils";

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
