import { registerUserHandler } from "../controllers/auth.controller";
import { Router } from "express";
import { userFieldsValidationMiddleware } from "../middlewares/auth.middlewares";

const authRouter = Router();

authRouter.post(
  "/register",
  [userFieldsValidationMiddleware],
  registerUserHandler
);

export default authRouter;
