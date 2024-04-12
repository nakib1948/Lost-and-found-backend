import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoute } from "../modules/auth/auth.route";
import { categoryRoutes } from "../modules/foundItemCategory/foundItemCategory.route";
import { foundItemRoutes } from "../modules/foundItem/foundItem.route";
import { claimRoutes } from "../modules/claim/claim.route";
import { profileRoutes } from "../modules/profile/profile.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/register",
    route: userRoutes,
  },
  {
    path: "/login",
    route: authRoute,
  },
  {
    path: "/found-item-categories",
    route: categoryRoutes,
  },
  {
    path: "/found-items",
    route: foundItemRoutes,
  },
  {
    path: "/claims",
    route: claimRoutes,
  },
  {
    path: "/my-profile",
    route: profileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
