import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide name"]
    },
    email:{
        type:String,
        required:[true,"provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    refreshToken:{
        type:String,
       default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["active","inactive","suspended"],
        default:"active"
    },
    address_details:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"address"
        }
    ],
    shopping_cart:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"cart"
        }
    ],
    address_details:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"address"
        }
    ],
    order_history:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"order"
        }
    ],
    forgot_password_otp:{
        type:String,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    }

},{
    timestamps:true
})

const userModel=mongoose.model("users",userSchema);
export default userModel 