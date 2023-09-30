import { Request, Response, NextFunction } from "express";
import { productSchema, Product } from "../schemas/product.schema";
import { sanitizeZodValidationError } from "../utils/zod.error.utils";

export async function productsFieldsValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products: Product[] = req.body.products;

    if (!products || products.length == 0) {
      throw {
        status: 403,
        msg: "no products provided in the body",
      };
    }

    // Validate the fields of all the products
    for (let product of products) {
      const response = productSchema.safeParse(product);

      // If validation fails!
      if (!response.success) {
        const errorMessageObj = sanitizeZodValidationError(response.error);
        return res
          .status(400)
          .json({ success: false, message: errorMessageObj });
      }
    }

    // If all good, hop to the next handler
    next();
  } catch (error) {
    next(error);
  }
}
