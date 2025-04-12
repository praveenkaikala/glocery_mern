import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()
export const genarateAccessToken = async (userId) => {
  try {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: "10h"
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const genarateRefreshToken = async (userId) => {
  try {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    const updateuserToken=await userModel.updateOne({_id:userId},{
        refreshToken:token
    })
    return token;
  } catch (error) {
    console.error(error);
  }
};
