import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { createAddress, getAddress } from '../controllers/address.controller.js'

const router= express.Router()


router.post('/address/create',authMiddleware,createAddress)
router.post('/address/get',authMiddleware,getAddress)

export default router