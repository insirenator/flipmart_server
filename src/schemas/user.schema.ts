import { z } from "zod";

// Schema for parsing and validating the user
export const userSchema = z.object({
  name: z.string().regex(/^[a-z]+\s{0,1}[a-z]+$/i),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
});

// Type for static typing
export type User = z.infer<typeof userSchema>;
