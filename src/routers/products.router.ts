import { Router } from "express";
import {
  productMappingFieldsValidationMiddleware,
  productsFieldsValidationMiddleware,
} from "../middlewares/products.middlewares";
import addNewProductsHandler from "../controllers/products/add.new.products";
import { jwtTokenVerificationMiddleware } from "../middlewares/auth.middlewares";
import addExistingProductHandler from "../controllers/products/add.products";

const productsRouter = Router();

// Route to add existing product in seller inventory
productsRouter.post(
  "/",
  [jwtTokenVerificationMiddleware, productMappingFieldsValidationMiddleware],
  addExistingProductHandler
);

// Route to add new product
productsRouter.post(
  "/new",
  [jwtTokenVerificationMiddleware, productsFieldsValidationMiddleware],
  addNewProductsHandler
);

export default productsRouter;
