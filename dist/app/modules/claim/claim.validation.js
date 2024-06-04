"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimValidation = void 0;
const zod_1 = require("zod");
const validateItem = zod_1.z.object({
    foundItemId: zod_1.z.string({
        invalid_type_error: "foundItemId  must be string",
        required_error: "foundItemId is required",
    }),
    claimRequest: zod_1.z.string({
        invalid_type_error: "claimRequest  must be string",
        required_error: "claimRequest  is required",
    }),
    imageProf: zod_1.z.string({
        invalid_type_error: "imageProf  must be string",
        required_error: "imageProf  is required",
    }),
    phone: zod_1.z.string({
        invalid_type_error: "phone  must be string",
        required_error: "phone  is required",
    }),
    lostDate: zod_1.z.string({
        invalid_type_error: "lostDate  must be string",
        required_error: "lostDate  is required",
    }),
});
exports.claimValidation = {
    validateItem,
};
