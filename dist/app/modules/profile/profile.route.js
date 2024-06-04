"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), profile_controller_1.profileController.getProfile);
router.patch("/", (0, auth_1.default)(), profile_controller_1.profileController.updateProfile);
router.patch("/change-password", (0, auth_1.default)(), profile_controller_1.profileController.updatePassword);
exports.profileRoutes = router;
