"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const category = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "Category name must be string",
        required_error: "Category name is required",
    }),
});
exports.categoryValidation = {
    category,
};
