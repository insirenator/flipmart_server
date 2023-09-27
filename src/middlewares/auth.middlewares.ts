import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { sanitizeZodValidationError } from "../utils/zod.error.utils";
import { getUserByEmail } from "../database/users.db";
import { comparePassword } from "../utils/password.utils";

export async function userFieldsValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;

    // Validate the fields
    const response = userSchema.safeParse({ name, email, password });

    // If validation fails!
    if (!response.success) {
      const errorMessageObj = sanitizeZodValidationError(response.error);
      return res.status(400).json({ success: false, message: errorMessageObj });
    }

    // If all good, hop to the next handler
    next();
  } catch (error) {
    next(error);
  }
}

export async function userLoginValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not registered" });
    }

    // Check if password is correct
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect password" });
    }
    // If all good, attach the user data to locals and forward to next handler
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
