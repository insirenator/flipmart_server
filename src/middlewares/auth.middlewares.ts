import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { sanitizeZodValidationError } from "../utils/zod.error.utils";

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
