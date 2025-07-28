import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js'

const router= express.Router()


router.post('/create',authMiddleware,addToCartItemController)
router.get("/get",authMiddleware,getCartItemController)
router.put('/update-qty',authMiddleware,updateCartItemQtyController)
router.delete('/delete-cart-item',authMiddleware,deleteCartItemQtyController)

export default router