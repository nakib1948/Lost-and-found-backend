import { z } from "zod";

const validateItem = z.object({
  categoryId: z.string({
    invalid_type_error: "categoryId must be string",
    required_error: "categoryId is required",
  }),
  foundItemName: z.string({
    invalid_type_error: "foundItemName must be string",
    required_error: "foundItemName is required",
  }),
  description: z.string({
    invalid_type_error: "description must be string",
    required_error: "description is required",
  }),
  location: z.string({
    invalid_type_error: "location must be string",
    required_error: "location is required",
  }),
});
export const itemValidation = {
    validateItem,
};
