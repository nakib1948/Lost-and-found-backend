import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { lostItemController } from "./lostItem.controller";
import { itemValidation } from "./lostItem.validation";

const router = express.Router();

router.post("/",auth(),validateRequest(itemValidation.validateItem), lostItemController.createLostItem);
router.get("/",auth(), lostItemController.getLostItem);

export const lostItemRoutes = router;
