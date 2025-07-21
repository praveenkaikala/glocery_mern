import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'
import { deleteProductController, getAllProductsController, getProductByCategoryAndSubCategory, getProductById, uploadProductController } from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.js'
import { getProductByCategory } from '../controllers/category.controller.js'

const router=express.Router()


router.post("/product",authMiddleware,adminAuth,upload.single("image"),uploadProductController)
router.post("/get-product",authMiddleware,adminAuth,getAllProductsController);
router.delete("/delete-product",authMiddleware,adminAuth,deleteProductController);
router.post("/get-product-by-category",getProductByCategory);
router.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
router.post('/get-product-by-id',getProductById)
export default router