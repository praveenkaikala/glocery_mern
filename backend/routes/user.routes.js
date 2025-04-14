import express from "express"
const router=express.Router()
import { forgotPasswordController, loginController, logiOutController, registerUserController, updateDetailsController, uploadAvtar, verifyEmailController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.js"
import { upload } from "../middleware/multer.js"


router.post("/register",registerUserController)
router.get("/verify-email",verifyEmailController)
router.post("/login",loginController)
router.get("/logout",authMiddleware,logiOutController)
router.put("/upload-avatar",authMiddleware,upload.single('avatar'),uploadAvtar)
router.put("/update-user",authMiddleware,updateDetailsController)
router.post("/forgot-password",forgotPasswordController);
export default router