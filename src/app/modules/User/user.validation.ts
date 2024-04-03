import { z } from "zod";

const createUser = z.object({
  name: z.string({
    invalid_type_error: "username must be string",
    required_error: "username is required",
  }),
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      invalid_type_error: "password must be string",
      required_error: "password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters long" }),
  profile: z.object({
    bio: z.string({
      invalid_type_error: "bio must be string",
      required_error: "bio is required",
    }),

    age: z.number({
      invalid_type_error: "age must be number",
      required_error: "age is required",
    }),
  }),
});
export const userValidation = {
  createUser,
};
