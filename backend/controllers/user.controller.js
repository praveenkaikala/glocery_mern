import userModel from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";
import bcryptjs from "bcryptjs"
export const registerUserController = async (req,res) => {
  try {
    const {name,email,password}=req.body;
    if(!name || !email || !password)
    {
        return res.status(400).send({
            message:"provide email,name,password",
            success:false,
            error:true
        })
    }
    const user=await userModel.findOne({email});
    if(user)
    {
        return res.status(400).send({
            message:"already registered email",
            success:false,
            error:true
        })
    }

    const salt=await bcryptjs.genSalt(10);
    const hasedPassword=await bcryptjs.hash(password,salt) 
    const newUser=new userModel({
        name,
        email,
        password:hasedPassword
    })
    const save=await newUser.save()
    const verificationLink=`${process.env.FRONTEND_URL}api/user/verify-email?code=${save?save._id:  "123455789"}`
    await sendEmail(email, name,verificationLink);
    return res.status(201).send({
        message:"user created",
        error:false,
        success:true
    })
  } catch (error) {
    res.status(500).send({'message':error.message || error,
        success:false
    })
    console.error(error);
  }
};

export  const verifyEmailController = async (req,res) => {
  try {
    const {code}=req.query
    const user =await userModel.findOne({_id:code})
    if(!user)
    {
        return res.status(400).send({
            message:"invalid code",
            error:true,
            success:false
        })
    }
    const updateUser=await userModel.updateOne({_id:code},{
        verify_email:true
    })
    return res.status(200).send({
        message:"email verified",
        error:false,
        success:true
    })
  } catch (error) {
    console.error(error);
  }
};