import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.optional(z.string()),
  // seller_id: z.string(),
  quantity: z.number(),
  price: z.number(),
  currency: z.string(),
});

export type Product = z.infer<typeof productSchema>;
