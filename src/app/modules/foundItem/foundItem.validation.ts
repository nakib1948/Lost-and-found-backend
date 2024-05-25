import { z } from "zod";

const validateItem = z.object({
  foundItemName: z.string({
    invalid_type_error: "foundItemName must be string",
    required_error: "foundItemName is required",
  }),
  itemCategory: z.string({
    invalid_type_error: "itemCategory must be string",
    required_error: "itemCategory is required",
  }),
  description: z.string({
    invalid_type_error: "description must be string",
    required_error: "description is required",
  }),
  date: z.string({
    invalid_type_error: "date must be string",
    required_error: "date is required",
  }),
  location: z.string({
    invalid_type_error: "location must be string",
    required_error: "location is required",
  }),
  phone: z.string({
    invalid_type_error: "phone must be string",
    required_error: "phone is required",
  }),
  email: z.string({
    invalid_type_error: "email must be string",
    required_error: "email is required",
  }),
  image: z.string({
    invalid_type_error: "image must be string",
    required_error: "image is required",
  }),
});
export const itemValidation = {
    validateItem,
};
