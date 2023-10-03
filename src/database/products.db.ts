import { nanoid } from "nanoid";

import { ExistingProduct, Product } from "../schemas/product.schema";
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

export async function insertProductsInBulk(products: Product[]) {
  const client = await pool.connect();

  for (let product of products) {
    const queryObj = buildInsertQuery("products", {
      product_id: nanoid(),
      ...product,
    });

    await client.query(queryObj);
  }
}

export async function createProductSellerMappings(
  seller_id: string,
  products: ExistingProduct[]
) {
  const client = await pool.connect();

  for (let product of products) {
    const queryObj = buildInsertQuery("product_seller_mapping", {
      seller_id,
      ...product,
    });

    await client.query(queryObj);
  }
}
