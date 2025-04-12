const mongoose=require('mongoose') 

const cartSchema=new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"product",
    },
    quantity:{
        type:Number,
        default:0
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
    }
},{
    timestamps:true
})

const cartModel=mongoose.model("cart",cartSchema)

export default cartModel