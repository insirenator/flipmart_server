import { Router } from "express";

import {
  loginUserHandler,
  registerUserHandler,
  registerSellerHandler,
  verifyUserHandler,
} from "../controllers/auth/index";

import {
  jwtTokenVerificationMiddleware,
  userFieldsValidationMiddleware,
  userLoginValidationMiddleware,
} from "../middlewares/auth.middlewares";

const authRouter = Router();

authRouter.post(
  "/register",
  [userFieldsValidationMiddleware],
  registerUserHandler
);

authRouter.post(
  "/verify-user",
  [jwtTokenVerificationMiddleware],
  verifyUserHandler
);

authRouter.post("/login", [userLoginValidationMiddleware], loginUserHandler);

authRouter.post(
  "/seller/register",
  [jwtTokenVerificationMiddleware],
  registerSellerHandler
);

export default authRouter;
