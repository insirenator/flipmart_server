import { z } from "zod";

export const sanitizeZodValidationError = (error: z.ZodError) => {
  let invalidFields = [];

  for (let issue of error.issues) {
    invalidFields.push(issue.path[0]);
  }

  return {
    error: "Validation Failed!",
    invalidFields,
  };
};
