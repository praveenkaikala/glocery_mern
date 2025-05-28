import express from "express"
import { upload } from "../middleware/multer.js"
import { createCategoryController, getCategoryController } from "../controllers/category.controller.js"
import { authMiddleware } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
const router=express.Router()

router.post("/create-category",authMiddleware,adminAuth,upload.single("image"),createCategoryController);
router.get("/get-category",authMiddleware,adminAuth,getCategoryController)
export default router