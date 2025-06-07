import subCategoryModel from "../models/subCategory.model.js"
import { uploadImage } from "../utils/uploadImage.js"

export const createSubCategoryController=async(req,res)=>{
    try {
        const {name,category}=req.body
        const image=req.file
        console.log(category)
        if(!name || !category || !image)
        {
            return res.status(400).send({
            message:"Name,Image,Category Required",
            success:false,
            error:true
        })
    }
        const imageUrl= await uploadImage(image)
        const newsub=await subCategoryModel.create({
            name,
            image:imageUrl.url,
            categoryId: typeof category === "string" ? JSON.parse(category) : category
        })
        if(!newsub)
        {
            return res.status(400).send({
            message:"SubCategory Creation Failed",
            success:false,
            error:true
        })}
        return res.status(201).send({
            message:"SubCategory Created",
            success:true,
            error:false
        })
    } catch (error) {
          return res.status(500).send({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}
