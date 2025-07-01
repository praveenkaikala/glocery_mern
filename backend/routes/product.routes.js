import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'
import { deleteProductController, getAllProductsController, uploadProductController } from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.js'

const router=express.Router()


router.post("/product",authMiddleware,adminAuth,upload.single("image"),uploadProductController)
router.post("/get-product",authMiddleware,adminAuth,getAllProductsController);
router.delete("/delete-product",authMiddleware,adminAuth,deleteProductController);
export default router