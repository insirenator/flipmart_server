import { nanoid } from "nanoid";

import { Product } from "../schemas/product.schema";
import pool from "./db";
import { buildInsertQuery } from "./queries/insert.queries";

export async function insertProduct(product: Product) {
  const client = await pool.connect();
  const queryObj = buildInsertQuery("products", {
    product_id: nanoid(),
    ...product,
  });

  const res = await client.query(queryObj);
}

export async function insertProductsInBulk(
  seller_id: string,
  products: Product[]
) {
  const client = await pool.connect();

  for (let product of products) {
    const queryObj = buildInsertQuery("products", {
      product_id: nanoid(),
      seller_id,
      ...product,
    });

    await client.query(queryObj);
  }
}
