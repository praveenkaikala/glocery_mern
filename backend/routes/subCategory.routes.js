import express from "express"
import { upload } from "../middleware/multer.js"
import { authMiddleware } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { createSubCategoryController, DeleteSubCategoryController, getSubCategoryController, UpdateSubCategoryController } from "../controllers/subCategory.controller.js";
const router=express.Router()

router.post("/create-subcategory",authMiddleware,adminAuth,upload.single("image"),createSubCategoryController)
router.get("/get-subcategory",authMiddleware,adminAuth,getSubCategoryController)
router.delete("/delete-subcategory",authMiddleware,adminAuth,DeleteSubCategoryController)
router.put("/update-subcategory",authMiddleware,adminAuth,upload.single("image"),UpdateSubCategoryController)
export default router