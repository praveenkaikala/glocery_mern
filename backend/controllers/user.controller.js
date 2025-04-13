import userModel from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";
import bcryptjs from "bcryptjs"
import { genarateAccessToken, genarateRefreshToken } from "../utils/genarateToken.js";
import { uploadImage } from "../utils/uploadImage.js";
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
    console.error(error);
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
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
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};


export const loginController = async (req,res) => {
  try {
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).send({
            message:"email,password required",
            success:false,
            error:true
        })
    }
    const user =await userModel.findOne({email});
    if(!user)
    {
        return res.status(404).send({
            success:false,
            error:true,
            message:"user not found"
        })
    }
    if(user.status!="active")
    {
        return res.status(400).send({
            success:false,
            error:true,
            message:"account inactive"
        })
    }
    const check=await bcryptjs.compare(password,user.password)
    if(!check)
    {
        return res.status(400).send({
            success:false,
            error:true,
            message:"password invalid"
        })
    }

    const accessToken=await genarateAccessToken(user._id);
    const refreshToken=await genarateRefreshToken(user._id)
    const cokkieOptions={
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.cookie('accesstoken',accessToken,cokkieOptions)
    res.cookie('refreshtoken',refreshToken,cokkieOptions)
    return res.status(200).send({
        success:true,
        error:false,
        message:"login success",
        data:{
            accessToken,refreshToken
        }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};


export const logiOutController = async (req,res) => {
  try {
    const cokkieOptions={
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.clearCookie("accesstoken",cokkieOptions)
    res.clearCookie("refreshtoken",cokkieOptions)
    console.log(req.userId);
    
    await userModel.findByIdAndUpdate(req.userId,{
        refreshToken:""
    })
    return res.status(200).send({
        message:"logout success",
        error:false,
        success:true
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};

export const uploadAvtar = async (req,res) => {
  try {
    const userId=req.userId
    const image=req.file
    const upload=await uploadImage(image)
    const update=await userModel.findByIdAndUpdate(userId,{
        avatar:upload.url
    })

    return res.status(200).send({
        success:false,
        error:true,
        message:"upload success",
        data:{
            _id:userId,
            url:upload.url
        }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};
