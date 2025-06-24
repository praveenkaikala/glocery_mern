import mongoose from "mongoose"

const productSchema=mongoose.Schema({
   name:
   {
    type:String
   },
   image:{
    type:String,
    default:""
   },
   category:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"category"
    }
   ],
   subcategory:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"subcategory"
    }
   ],
   unit:{
    type:String,
    default:""
   },
   stock:{
    type:Number,
    default:0
   },
   price:{
    type:Number,
    default:null
   },
   discount:{
    type:Number,
    default:null
   },
   discription:{
    
        type:String,
        default:""
    
   },
   more_details:{
    type:Object,
    default:{}
   },
   publish:{
    type:Boolean,
    default:true
   }
},{
    timestamps:true
})

const productModel=mongoose.model("product",productSchema);
export default productModel 