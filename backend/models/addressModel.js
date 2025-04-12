const mongoose=require('mongoose')

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
    }
},{
    timestamps:true
})

const addressModel=mongoose.model("address",addressSchema);
export default addressModel 