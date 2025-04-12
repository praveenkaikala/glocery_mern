const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

 const connectDatabase =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"glocery"
    }).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports={connectDatabase}