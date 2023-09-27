import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

type UserPayload = {
  id: number;
  name: string;
  email: string;
};

export function generateAccessToken(payload: UserPayload, expireLimit = "10d") {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: expireLimit,
  });
  return accessToken;
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return {
      success: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}
