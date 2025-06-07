import express from "express"
import { upload } from "../middleware/multer.js"
import { authMiddleware } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { createSubCategoryController } from "../controllers/subCategory.controller.js";
const router=express.Router()

router.post("/create-subcategory",authMiddleware,adminAuth,upload.single("image"),createSubCategoryController)

export default router