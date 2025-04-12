import express from "express"
const router=express.Router()
import { loginController, logiOutController, registerUserController, verifyEmailController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.js"


router.post("/register",registerUserController)
router.get("/verify-email",verifyEmailController)
router.post("/login",loginController)
router.get("/logout",authMiddleware,logiOutController)
export default router