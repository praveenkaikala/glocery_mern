import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js'

const router= express.Router()


router.post('/cart/create',authMiddleware,addToCartItemController)
router.get("/cart/get",authMiddleware,getCartItemController)
router.put('/cart/update-qty',authMiddleware,updateCartItemQtyController)
router.delete('/cart/delete-cart-item',authMiddleware,deleteCartItemQtyController)

export default router