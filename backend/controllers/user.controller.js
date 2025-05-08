import userModel from "../models/user.model.js";
import { sendEmail, sentOtp } from "../utils/email.js";
import bcryptjs from "bcryptjs"
import { genarateAccessToken, genarateRefreshToken } from "../utils/genarateToken.js";
import { uploadImage } from "../utils/uploadImage.js";
import { genarateOtp } from "../utils/genarateOtp.js";
import jwt from "jsonwebtoken";
export const registerUserController = async (req,res) => {
  try {
    const {name,email,password}=req.body;
    if(!name || !email || !password)
    {
        return res.status(400).send({
            message:"Provide Email,Name,Password",
            success:false,
            error:true
        })
    }
    const user=await userModel.findOne({email});
    if(user)
    {
        return res.status(400).send({
            message:"Already Registered Email",
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
        message:"User Registered",
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
            message:"Invalid USer",
            error:true,
            success:false
        })
    }
    const updateUser=await userModel.updateOne({_id:code},{
        verify_email:true
    })
    return res.status(200).send({
        message:"Email Verified",
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
            message:"Email,Password Required",
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
            message:"User Not Found"
        })
    }
    if(user.status!="active")
    {
        return res.status(400).send({
            success:false,
            error:true,
            message:"Account Inactive"
        })
    }
    const check=await bcryptjs.compare(password,user.password)
    if(!check)
    {
        return res.status(400).send({
            success:false,
            error:true,
            message:"Password Invalid"
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
        message:"Login SuccessFull",
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
        message:"Logout Success",
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
        success:true,
        error:false,
        message:"Upload Success",
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


export const updateDetailsController = async (req,res) => {
  try {
    const {name,email,mobile,password}=req.body
    let hashpass=""
    if(password)
    {
        const salt=await bcryptjs.genSalt(10);
        hashpass=await bcryptjs.hash(password,salt) 
    }
    const updateUser=await userModel.findByIdAndUpdate(req.userId,{
        ...(name && {name:name}),
        ...(email && {email:email}),
        ...(mobile && {mobile:mobile}),
        ...(password && {password:hashpass}),

    },{
        new:true
    })
    return res.status(200).send({
        success:true,
        error:false,
        message:"Update SuccessFull",
        data:updateUser
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


export const forgotPasswordController = async (req,res) => {
  try {
    const {email} =req.body;

    const user=await userModel.findOne({email});
    if(!user)
    {
        return res.status(400).send({
            message:"Invalid Email",
            error:true,
            success:false
        })
    }

    const otp=genarateOtp()
    const expireTime=new Date()+60*60*1000

    const update=await userModel.findByIdAndUpdate(user._id,{
        forgot_password_otp:otp,
        forgot_password_expiry:new Date(expireTime).toISOString()
    })
     await sentOtp(user.name,email,otp)
    return res.status(200).send({
        message:"Otp Sent To Email",
        error:false,
        success:true,
    })
  } catch (error) {
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};

export const verifyOtpController = async (req,res) => {
  try {
    const {email,otp}=req.body;
    if(!otp || !email)
        {
            return res.status(400).send({
                message:"Provide Otp,Email",
                error:true,
                success:false
            })
        }
    const user=await userModel.findOne({email});
    if(!user)
    {
        return res.status(400).send({
            message:"Invalid Email",
            error:true,
            success:false
        })
    }
    const currTime=new Date().toISOString();
    if(currTime > user.forgot_password_expiry)
    {
        return res.status(400).send({
            message:"Otp Expire",
            error:true,
            success:false
        })
    }
    
    if(otp !== user.forgot_password_otp)
    {
        return res.status(400).send({
            message:"Otp Invalid",
            error:true,
            success:false
        })
    }

    return res.status(200).send({
        message:"Otp Valid SuccessFull",
        error:false,
        success:true
    })
  } catch (error) {
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};


export const resetPassword = async (req,res) => {
  try {
    const {email,newPassword}=req.body;
    if(!newPassword || !email)
        {
            return res.status(400).send({
                message:"Provide Email,Password",
                error:true,
                success:false
            })
        }
    const user=await userModel.findOne({email});
    if(!user)
    {
        return res.status(400).send({
            message:"Invalid Email",
            error:true,
            success:false
        })
    }
    const salt=await bcryptjs.genSalt(10);
    const hashpass=await bcryptjs.hash(newPassword,salt) 
    const update=await userModel.findByIdAndUpdate(user._id,{
        password:hashpass,
        forgot_password_otp:null,
        forgot_password_expiry:""

    })
    return res.status(200).send({
        message:"Password Changed SuccessFull",
        error:false,
        success:true
    })
  } catch (error) {
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};




export const refreshToken = async (req,res) => {
  try {
    const refreshToken=req.cookies.refreshtoken || req.header.authorization.split()[1];
    if(!refreshToken)
    {
        return res.status(400).send({
            message:"Unotherized Access",
            error:true,
            success:false
        })

    }
    const verifyToken=await jwt.verify(refreshToken,process.env.SECRET_KEY)
    if(!verifyToken)
    {
        return res.status(401).send({
            message:"Token Expire",
            error:true,
            success:false
        })
    }
    console.log(verifyToken);
    const userId=refreshToken?.id;
    const accessToken=await genarateAccessToken(userId);
    const cokkieOptions={
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.cookie('accesstoken',accessToken,cokkieOptions)
    return res.status(200).send({
        message:"new access token generated",
        error:false,
        success:true
    })
  } catch (error) {
    return res.status(500).send({
        success:false,
        error:true,
        message:error.message || error
    })
  }
};