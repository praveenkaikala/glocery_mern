import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { createAddress, deleteAddress, getAddress, updateAddress } from '../controllers/address.controller.js'

const router= express.Router()


router.post('/address/create',authMiddleware,createAddress)
router.get('/address/get',authMiddleware,getAddress)
router.put('/address/update',authMiddleware,updateAddress)
router.delete('/address/delete',authMiddleware,deleteAddress)

export default router