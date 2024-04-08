import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { foundItemController } from "./foundItem.controller";
import { itemValidation } from "./foundItem.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/",auth(),validateRequest(itemValidation.validateItem), foundItemController.createFoundItem);
router.get("/", foundItemController.getFoundItem);

export const foundItemRoutes = router;
