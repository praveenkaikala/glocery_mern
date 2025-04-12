const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
   name:
   {
    type:String
   },
   image:{
    type:Array,
    default:[]
   },
   category:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"category"
    }
   ],
   sub_category:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"subcategory"
    }
   ],
   unit:{
    type:String,
    default:null
   },
   stock:{
    type:Number,
    default:0
   },
   price:{
    type:Number,
    default:null
   },
   dicount:{
    type:Number,
    default:null
   },
   discription:{
    
        type:string,
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