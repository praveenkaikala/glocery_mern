import express from "express"
const app=express();
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()
import cokkieparser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import { connectDatabase } from "./utils/connectDB.js";
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(cokkieparser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello user");
})
app.use("/api/user",userRouter)
app.use(helmet({
    crossOriginResourcePolicy:false
}))


connectDatabase()
app.listen(5000,()=>{
    console.log("app is running on 5000");
})