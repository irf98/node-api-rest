import { Router } from "express"
import { authenticateToken } from "../../utils/jwt.js"
import User from "./userController.js"

const router = Router()

function routes(app) {
    app.use("/api/users", router)

    router.post("/email", User.getUserByEmail)

    router.post("/signup", User.signUp)
    router.post("/signin", User.signIn)

    router.post("/request-recovery", User.requestPasswordRecovery)
    router.put("/recovery", User.passwordRecovery)

    router.get("/protected", authenticateToken, User.protectedRoute)
}

export default routes