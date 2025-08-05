import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { createAddress, getAddress, updateAddress } from '../controllers/address.controller.js'

const router= express.Router()


router.post('/address/create',authMiddleware,createAddress)
router.get('/address/get',authMiddleware,getAddress)
router.put('/address/update',authMiddleware,updateAddress)

export default router