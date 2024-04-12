"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const foundItemCategory_validation_1 = require("./foundItemCategory.validation");
const foundItemCategory_contoller_1 = require("./foundItemCategory.contoller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(foundItemCategory_validation_1.categoryValidation.category), foundItemCategory_contoller_1.categoryController.createCategory);
exports.categoryRoutes = router;
