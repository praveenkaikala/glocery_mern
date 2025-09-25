import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { cashOnDeliveryController, onlinePaymentController } from '../controllers/order.controller.js'

const router= express.Router()


router.post('/order/cod',authMiddleware,cashOnDeliveryController)
router.post('/order/online',authMiddleware,onlinePaymentController)
export default router