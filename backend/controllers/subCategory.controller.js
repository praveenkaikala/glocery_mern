import subCategoryModel from "../models/subCategory.model.js"
import { uploadImage } from "../utils/uploadImage.js"

export const createSubCategoryController=async(req,res)=>{
    try {
        const {name,category}=req.body
        const image=req.file

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



export const getSubCategoryController=async(req,res)=>{
    try {
        const subcategorys=await subCategoryModel.find().sort({createdAt:-1}).populate("categoryId");
        return res.status(200).send({
            message:"SubCategory List",
            success:true,
            error:false,
            data:subcategorys
        })
    } catch (error) {
         return res.status(500).send({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}


export const DeleteSubCategoryController=async(req,res)=>{
    try {
       
        const {id}=req.body;
        const subCategory=await subCategoryModel.deleteOne({_id:id})
        if(!subCategory)
        {
            return res.status(403).send({
            message:"SubCategory Delation Failed",
            success:false,
            error:true
            })
        }
        return  res.status(200).send({
            message:"SubCategory Deleted",
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

export const UpdateSubCategoryController=async(req,res)=>{
    try {
        const image=req.file;
        const{id,name,categoryId}=req.body;
        if(!name || !categoryId || !image)
        {
            return res.status(400).send({
            message:"Name,Image,Category Required",
            success:false,
            error:true
        })
    }
        const imageUrl= await uploadImage(image)
        const sub=await subCategoryModel.updateOne({_id:id},{
            name,
            image:imageUrl.url,
            categoryId:typeof categoryId ==="string" ? JSON.parse(categoryId) : categoryId
        })
        if(!sub)
        {
            return res.status(400).send({
            message:"SubCategory Updation Failed",
            success:false,
            error:true
        })}
        return res.status(201).send({
            message:"SubCategory Updated",
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