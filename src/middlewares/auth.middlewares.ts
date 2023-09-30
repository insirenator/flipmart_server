import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { sanitizeZodValidationError } from "../utils/zod.error.utils";
import { getUserByEmail } from "../database/users.db";
import { compareHash } from "../utils/hashing.utils";
import { verifyAccessToken } from "../utils/jwt.utils";

export async function userFieldsValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password, address } = req.body;

    // Validate the fields
    const response = userSchema.safeParse({
      name,
      email,
      password,
      address,
    });

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
    const fetchedUser = await getUserByEmail(email);

    if (!fetchedUser) {
      return res.status(401).json({
        success: false,
        message: "user not registered",
      });
    }

    // Object Destructuring Trick
    const { password: hashedPassword, ...userInfo } = fetchedUser;

    // Check if password is correct
    const passwordMatch = await compareHash(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }
    // If all good, attach the user data to locals and forward to next handler
    res.locals.user = userInfo;
    next();
  } catch (error) {
    next(error);
  }
}

export async function jwtTokenVerificationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw {
        status: 401,
        msg: "no or invalid authentication header",
      };
    }

    const token = authHeader.split(" ")[1];
    const verification = verifyAccessToken(token);

    if (!verification.success) {
      throw {
        status: 401,
        msg: verification.message,
      };
    }

    // If all good
    res.locals.jwtPayload = verification.payload;
    next();
  } catch (error) {
    next(error);
  }
}
