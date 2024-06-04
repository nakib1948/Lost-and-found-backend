"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lostItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const lostItem_controller_1 = require("./lostItem.controller");
const lostItem_validation_1 = require("./lostItem.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(lostItem_validation_1.itemValidation.validateItem), lostItem_controller_1.lostItemController.createLostItem);
router.get("/", (0, auth_1.default)(), lostItem_controller_1.lostItemController.getLostItem);
router.get("/getAllLostItem", lostItem_controller_1.lostItemController.getAllLostItem);
router.patch("/", lostItem_controller_1.lostItemController.updateLostItemStatus);
exports.lostItemRoutes = router;
