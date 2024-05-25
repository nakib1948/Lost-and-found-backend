import { z } from "zod";

const validateItem = z.object({
  itemCategory: z.string({
    invalid_type_error: "ItemCategory must be string",
    required_error: "ItemCategory is required",
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
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .email({ message: "Invalid email address" }),
  image: z.string({
    invalid_type_error: "image must be string",
    required_error: "image is required",
  }),
});
export const itemValidation = {
  validateItem,
};
