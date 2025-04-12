import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

 export const connectDatabase =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"glocery"
    }).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log(err)
    })
}
