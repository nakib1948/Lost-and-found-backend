import { z } from "zod";

const validateItem = z.object({
  foundItemId: z.string({
    invalid_type_error: "foundItemId  must be string",
    required_error: "foundItemId is required",
  }),
  distinguishingFeatures: z.string({
    invalid_type_error: "distinguishingFeatures  must be string",
    required_error: "distinguishingFeatures  is required",
  }),
  lostDate: z.string({
    invalid_type_error: "lostDate  must be string",
    required_error: "lostDate  is required",
  }),
});
const validateStatusUpdate = z.object({
    status: z.enum(["APPROVED", "PENDING", "REJECTED"])
})
export const claimValidation = {
  validateItem,
  validateStatusUpdate
};
