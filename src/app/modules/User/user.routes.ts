import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUser),
  userController.createUser
);
router.get("/", auth(), userController.getAllUser);
router.patch("/", auth(), userController.updateUserStatus);

export const userRoutes = router;
