import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()
export const authMiddleware = async (req,res,next) => {
  try {
    const token=req.cookies.accesstoken || req.headers.authorization.split(" ")[1];
    if(!token)
    {
        return res.status(400).send({
            success:false,
            error:true,
            message:"provide token"
        }) 
    }
    const verify = jwt.verify(token,process.env.SECRET_KEY)
    if(!verify)
    {
        return res.status(401).send({
            success:false,
            error:true,
            message:"unotherized access"
        }) 
    }
    
    req.userId=verify.id
    next()
    
  } catch (error) {
   if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token expired",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};