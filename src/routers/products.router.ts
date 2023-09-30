import { Router } from "express";
import { productsFieldsValidationMiddleware } from "../middlewares/products.middlewares";
import addProductsHandler from "../controllers/products/add.products";
import { jwtTokenVerificationMiddleware } from "../middlewares/auth.middlewares";

const productsRouter = Router();

productsRouter.post(
  "/",
  [jwtTokenVerificationMiddleware, productsFieldsValidationMiddleware],
  addProductsHandler
);

export default productsRouter;
