import express from "express"
const app=express();
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()
import cokkieparser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import subCategoryRouter from "./routes/subCategory.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import addressRoutes from './routes/address.routes.js'
import orderRoutes from "./routes/order.routes.js"
import { connectDatabase } from "./utils/connectDB.js";
const allowOrigins=[process.env.FRONTEND_URL_LOCAL,process.env.FRONTEND_URL_GLOBAL]
app.use(cors({
    credentials:true,
    origin:allowOrigins
}))
app.use(cokkieparser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello user");
})
app.use("/api/user",userRouter)
app.use("/api/user",categoryRouter)
app.use("/api/user",subCategoryRouter)
app.use("/api/user",productRoutes)
app.use("/api/user",cartRoutes)
app.use("/api/user",addressRoutes)
app.use("/api/user",orderRoutes)
app.use(helmet({
    crossOriginResourcePolicy:false
}))


connectDatabase()
app.listen(5000,()=>{
    console.log("app is running on 5000");
})