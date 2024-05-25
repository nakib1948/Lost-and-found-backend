import express from "express";
import auth from "../../middlewares/auth";
import { profileController } from "./profile.controller";

const router = express.Router();


router.get("/", auth(), profileController.getProfile);
router.patch("/", auth(), profileController.updateProfile);
router.patch("/change-password",auth(), profileController.updatePassword);
export const profileRoutes = router;
