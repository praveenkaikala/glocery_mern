import addressModel from "../models/address.model.js";
import userModel from "../models/user.model.js"
export const createAddress=async(req,res)=>{
    try {
        const {city,address_line,state,pincode,country,mobile}=req.body;
        const userId=req.userId;
        const createAddress=new addressModel({
            address_line,
            city,
            state,
            mobile,
            country,mobile,
            pincode,
            userId
        })
       const save= await createAddress.save()

        const user=await userModel.findByIdAndUpdate(userId,{
            $push:{
                address_details:save._id
            }
        })
         return res.json({
            data : save,
            message : "Address add successfully",
            error : false,
            success : true
        })

    } catch (error) {
      return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })   
    }
}


export const getAddress=async(req,res)=>{
    try {
        const userId=req.userId;
        const addresses=await addressModel.find({userId}).sort({createdAt:-1})
         return res.json({
            data : addresses,
            message : "Address List",
            error : false,
            success : true
        })
    } catch (error) {
         return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })  
    }
}


export const updateAddress=async(req,res)=>{
     try {
        const {city,address_line,state,pincode,country,mobile,id}=req.body;
        const userId=req.userId;
        const updated=await addressModel.findOneAndUpdate({_id:id,userId},{
           city,address_line,state,pincode,country,mobile
        })
         return res.json({
            data : updated,
            message : "Address Updated successfully",
            error : false,
            success : true
        })

    } catch (error) {
      return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })   
    }
}