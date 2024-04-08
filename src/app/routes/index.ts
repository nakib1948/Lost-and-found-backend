import express from "express"
import { userRoutes } from "../modules/User/user.routes"
import { authRoute } from "../modules/auth/auth.route"

const router = express.Router()
const moduleRoutes = [
    {
        path:"/register",
        route:userRoutes
    },
    {
        path: "/login",
        route: authRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router