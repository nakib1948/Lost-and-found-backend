"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const foundItemCategory_route_1 = require("../modules/foundItemCategory/foundItemCategory.route");
const foundItem_route_1 = require("../modules/foundItem/foundItem.route");
const claim_route_1 = require("../modules/claim/claim.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/register",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/login",
        route: auth_route_1.authRoute,
    },
    {
        path: "/found-item-categories",
        route: foundItemCategory_route_1.categoryRoutes,
    },
    {
        path: "/found-items",
        route: foundItem_route_1.foundItemRoutes,
    },
    {
        path: "/claims",
        route: claim_route_1.claimRoutes,
    },
    {
        path: "/my-profile",
        route: profile_route_1.profileRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
