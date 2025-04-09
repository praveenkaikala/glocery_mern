const express=require('express');
const app=express();
const cors=require("cors");
const helmet=require('helmet')
const cookieparser=require("cookie-parser")
require("dotenv").config()
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(cookieparser())
app.get("/",(req,res)=>{
    res.send("hello user");
})
app.use(helmet({
    crossOriginResourcePolicy:false
}))
app.listen(5000,()=>{
    console.log("app is running on 5000");
})