"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidation = void 0;
const zod_1 = require("zod");
const validateItem = zod_1.z.object({
    categoryId: zod_1.z.string({
        invalid_type_error: "categoryId must be string",
        required_error: "categoryId is required",
    }),
    foundItemName: zod_1.z.string({
        invalid_type_error: "foundItemName must be string",
        required_error: "foundItemName is required",
    }),
    description: zod_1.z.string({
        invalid_type_error: "description must be string",
        required_error: "description is required",
    }),
    location: zod_1.z.string({
        invalid_type_error: "location must be string",
        required_error: "location is required",
    }),
});
exports.itemValidation = {
    validateItem,
};
