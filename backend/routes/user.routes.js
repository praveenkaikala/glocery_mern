import express from "express"
const router=express.Router()
import { loginController, logiOutController, registerUserController, uploadAvtar, verifyEmailController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.js"
import { upload } from "../middleware/multer.js"


router.post("/register",registerUserController)
router.get("/verify-email",verifyEmailController)
router.post("/login",loginController)
router.get("/logout",authMiddleware,logiOutController)
router.put("/upload-avatar",authMiddleware,upload.single('avatar'),uploadAvtar)
export default router