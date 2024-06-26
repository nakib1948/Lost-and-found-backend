"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidation = void 0;
const zod_1 = require("zod");
const validateItem = zod_1.z.object({
    foundItemName: zod_1.z.string({
        invalid_type_error: "foundItemName must be string",
        required_error: "foundItemName is required",
    }),
    itemCategory: zod_1.z.string({
        invalid_type_error: "itemCategory must be string",
        required_error: "itemCategory is required",
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
    district: zod_1.z.string({
        invalid_type_error: "district must be string",
        required_error: "district is required",
    }),
    phone: zod_1.z.string({
        invalid_type_error: "phone must be string",
        required_error: "phone is required",
    }),
    email: zod_1.z.string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
    }),
    image: zod_1.z.string({
        invalid_type_error: "image must be string",
        required_error: "image is required",
    }),
});
exports.itemValidation = {
    validateItem,
};
