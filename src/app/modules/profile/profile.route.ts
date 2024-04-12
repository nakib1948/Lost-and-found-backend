import express from "express";
import auth from "../../middlewares/auth";
import { profileController } from "./profile.controller";

const router = express.Router();


router.get("/", auth(), profileController.getProfile);
router.put("/", auth(), profileController.updateProfile);

export const profileRoutes = router;
