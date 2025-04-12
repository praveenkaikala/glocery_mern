import express from "express"
const router=express.Router()
import { registerUserController, verifyEmailController } from "../controllers/user.controller.js"


router.post("/register",registerUserController)
router.get("/verify-email",verifyEmailController)
export default router