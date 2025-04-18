const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    orderId:
    {
        type:String,
        required:[true,"provide orderid"],
        unique:true
    },
    product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    },
    product_details:{
        name:String,
        image:Array,

    },
    payment_id:{
        type:String,
        default:"",
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    sub_total_amount:{
        type:Number,
        default:0
    },
    total_amount:{
        type:Number,
        default:0 
    },
    invoice_recipt:{
         type:String,
        default:""  
    }
},{
    timestamps:true
})

const orderModel=mongoose.model("order",categorySchema)
export default orderModel