import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.optional(z.string()),
  image: z.optional(z.string()),
});

export type Product = z.infer<typeof newProductSchema>;

export const existingProductSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
  price: z.number(),
  currency: z.string(),
});

export type ExistingProduct = z.infer<typeof existingProductSchema>;
