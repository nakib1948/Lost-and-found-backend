import { z } from "zod";

const validateItem = z.object({
  foundItemId: z.string({
    invalid_type_error: "foundItemId  must be string",
    required_error: "foundItemId is required",
  }),
  claimRequest: z.string({
    invalid_type_error: "claimRequest  must be string",
    required_error: "claimRequest  is required",
  }),
  imageProf: z.string({
    invalid_type_error: "imageProf  must be string",
    required_error: "imageProf  is required",
  }),
  phone: z.string({
    invalid_type_error: "phone  must be string",
    required_error: "phone  is required",
  }),
  lostDate: z.string({
    invalid_type_error: "lostDate  must be string",
    required_error: "lostDate  is required",
  }),
});

export const claimValidation = {
  validateItem,
};
