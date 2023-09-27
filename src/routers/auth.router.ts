import {
  loginUserHandler,
  registerUserHandler,
} from "../controllers/auth.controller";
import { Router } from "express";
import {
  userFieldsValidationMiddleware,
  userLoginValidationMiddleware,
} from "../middlewares/auth.middlewares";

const authRouter = Router();

authRouter.post(
  "/register",
  [userFieldsValidationMiddleware],
  registerUserHandler
);

authRouter.post("/login", [userLoginValidationMiddleware], loginUserHandler);

export default authRouter;
