"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimValidation = void 0;
const zod_1 = require("zod");
const validateItem = zod_1.z.object({
    foundItemId: zod_1.z.string({
        invalid_type_error: "foundItemId  must be string",
        required_error: "foundItemId is required",
    }),
    distinguishingFeatures: zod_1.z.string({
        invalid_type_error: "distinguishingFeatures  must be string",
        required_error: "distinguishingFeatures  is required",
    }),
    lostDate: zod_1.z.string({
        invalid_type_error: "lostDate  must be string",
        required_error: "lostDate  is required",
    }),
});
const validateStatusUpdate = zod_1.z.object({
    status: zod_1.z.enum(["APPROVED", "PENDING", "REJECTED"])
});
exports.claimValidation = {
    validateItem,
    validateStatusUpdate
};
