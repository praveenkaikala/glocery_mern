import express from "express"
const router=express.Router()
import { registerUserController } from "../controllers/user.controller.js"


router.post("/register",registerUserController)

export default router