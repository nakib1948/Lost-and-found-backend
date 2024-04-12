"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "username must be string",
        required_error: "username is required",
    }),
    email: zod_1.z
        .string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
    })
        .email({ message: "Invalid email address" }),
    password: zod_1.z
        .string({
        invalid_type_error: "password must be string",
        required_error: "password is required",
    })
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must be less than 20 characters long" }),
    profile: zod_1.z.object({
        bio: zod_1.z.string({
            invalid_type_error: "bio must be string",
            required_error: "bio is required",
        }),
        age: zod_1.z.number({
            invalid_type_error: "age must be number",
            required_error: "age is required",
        }),
    }),
});
exports.userValidation = {
    createUser,
};
