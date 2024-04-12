import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { claimController } from "./claim.controller";
import { claimValidation } from "./claim.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(claimValidation.validateItem),
  claimController.createClaim
);

export const claimRoutes = router;
