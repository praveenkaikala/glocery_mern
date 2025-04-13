import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
})
export const uploadImage = async (image) => {
  try {
    const buffer=image?.buffer || Buffer.from(await image.arrayBuffer())
    const upload=await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:"blinkit"},(error,uploadresult)=>{
            return resolve(uploadresult)
        }).end(buffer)
    })
    return upload
  } catch (error) {
    console.error(error);
    return new Error("upload image error")
  }
};