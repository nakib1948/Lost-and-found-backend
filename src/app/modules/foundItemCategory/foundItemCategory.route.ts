import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./foundItemCategory.validation";
import { categoryController } from "./foundItemCategory.contoller";

const router = express.Router();

router.post("/",validateRequest(categoryValidation.category), categoryController.createCategory);

export const categoryRoutes = router;
