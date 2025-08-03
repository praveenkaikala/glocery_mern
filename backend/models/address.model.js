import mongoose from 'mongoose'

const addressSchema=mongoose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String,
        
    },
    country:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    statue:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const addressModel=mongoose.model("address",addressSchema);
export default addressModel 