import { z } from "zod";

const category = z.object({
  name: z.string({
    invalid_type_error: "Category name must be string",
    required_error: "Category name is required",
  }),
});
export const categoryValidation = {
  category,
};
