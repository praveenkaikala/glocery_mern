import express from "express"
const router=express.Router()
import { loginController, registerUserController, verifyEmailController } from "../controllers/user.controller.js"


router.post("/register",registerUserController)
router.get("/verify-email",verifyEmailController)
router.post("/login",loginController)
export default router