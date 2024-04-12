"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const foundItem_controller_1 = require("./foundItem.controller");
const foundItem_validation_1 = require("./foundItem.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(foundItem_validation_1.itemValidation.validateItem), foundItem_controller_1.foundItemController.createFoundItem);
router.get("/", foundItem_controller_1.foundItemController.getFoundItem);
exports.foundItemRoutes = router;
