"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidation = void 0;
const zod_1 = require("zod");
const validateItem = zod_1.z.object({
    itemCategory: zod_1.z.string({
        invalid_type_error: "ItemCategory must be string",
        required_error: "ItemCategory is required",
    }),
    description: zod_1.z.string({
        invalid_type_error: "description must be string",
        required_error: "description is required",
    }),
    date: zod_1.z.string({
        invalid_type_error: "date must be string",
        required_error: "date is required",
    }),
    location: zod_1.z.string({
        invalid_type_error: "location must be string",
        required_error: "location is required",
    }),
    phone: zod_1.z.string({
        invalid_type_error: "phone must be string",
        required_error: "phone is required",
    }),
    email: zod_1.z
        .string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
    })
        .email({ message: "Invalid email address" }),
    image: zod_1.z.string({
        invalid_type_error: "image must be string",
        required_error: "image is required",
    }),
});
exports.itemValidation = {
    validateItem,
};
