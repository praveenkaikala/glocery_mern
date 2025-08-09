import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { cashOnDeliveryController } from '../controllers/order.controller.js'

const router= express.Router()


router.post('/order/cod',authMiddleware,cashOnDeliveryController)
export default router