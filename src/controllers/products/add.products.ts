/*
  This handler is responsible for creating a mapping in products_seller_mapping
  of an existing product and a seller
*/

import { NextFunction, Request, Response } from "express";
import { createProductSellerMappings } from "../../database/products.db";

export default async function addExistingProductHandler(
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

    await createProductSellerMappings(seller_id, products);

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
