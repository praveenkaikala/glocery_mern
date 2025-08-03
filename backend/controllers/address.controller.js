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
            pincode
        })
       const save= await createAddress.save()

        const user=await userModel.updateOne({_id:userId},{
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