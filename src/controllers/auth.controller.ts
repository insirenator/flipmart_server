import { NextFunction, Request, Response } from "express";

import { getUserByEmail, insertUser } from "../database/users.db";

export async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;

    const userExists = await getUserByEmail(email);

    if (userExists.length) {
      return res
        .status(400)
        .json({ success: false, message: "user is already registered" });
    }

    const result = await insertUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "user registered!",
      user: result,
    });
  } catch (error) {
    next(error);
  }
}
