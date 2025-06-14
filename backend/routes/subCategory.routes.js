import express from "express"
import { upload } from "../middleware/multer.js"
import { authMiddleware } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { createSubCategoryController, getSubCategoryController } from "../controllers/subCategory.controller.js";
const router=express.Router()

router.post("/create-subcategory",authMiddleware,adminAuth,upload.single("image"),createSubCategoryController)
router.get("/get-subcategory",authMiddleware,adminAuth,getSubCategoryController)

export default router