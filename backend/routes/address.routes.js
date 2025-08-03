import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { createAddress } from '../controllers/address.controller.js'

const router= express.Router()


router.post('/address/create',authMiddleware,createAddress)

export default router