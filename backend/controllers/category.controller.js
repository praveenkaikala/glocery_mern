import categoryModel from "../models/category.model.js";
import CategoryModel from "../models/category.model.js";
import { uploadImage } from "../utils/uploadImage.js";

export const createCategoryController=async(req,res)=>{
    try {
        const image=req.file;
        const {name}=req.body;
        const imageUrl= await uploadImage(image)
        const category=await categoryModel.create({
            name,
            image:imageUrl.url
        })
        if(!category)
        {
            return res.status(403).send({
            message:"Category Not Created",
            success:false,
            error:true
            })
        }
        return  res.status(200).send({
            message:"New Category Created",
            success:true,
            error:false
            })

    } catch (error) {
        return res.status(500).send({
            message:error,
            success:false,
            error:true
        })
    }
}