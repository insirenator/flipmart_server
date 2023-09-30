import { NextFunction, Request, Response } from "express";
import { insertProductsInBulk } from "../../database/products.db";

/* 
  NOTE: This handler processes an array of the products. So if you
    have tp pass just one product, wrap it in the array too.
*/
export default async function addProductsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { products, seller_id } = req.body;
    const { jwtPayload } = res.locals;

    if (seller_id !== jwtPayload.id) {
      throw {
        status: 403,
        msg: "id mismatch: body seller_id and token seller_id do not match",
      };
    }

    await insertProductsInBulk(seller_id, products);

    res.status(201).json({
      success: true,
      message: `${products.length} ${
        products.length > 1 ? "products" : "product"
      } added successfully`,
    });
  } catch (error) {
    next(error);
  }
}
