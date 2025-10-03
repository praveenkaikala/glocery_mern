import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { cashOnDeliveryController, getOrders, onlinePaymentController } from '../controllers/order.controller.js'

const router= express.Router()


router.post('/order/cod',authMiddleware,cashOnDeliveryController)
router.post('/order/online',authMiddleware,onlinePaymentController)
router.get('/order/get',authMiddleware,getOrders);
export default router