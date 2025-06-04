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
            message:error.message || error,
            success:false,
            error:true
        })
    }
}
export const getCategoryController=async(req,res)=>{
    try {
        const data=await categoryModel.find().sort({createdAt:-1})
        return res.status(200).send({
            message:"category List",
            success:true,
            error:false,
            data
        })
    } catch (error) {
        return res.status(500).send({
            message:error?.message || error,
            success:false,
            errro:true
        })
    }
}

export const UpdateCategoryController=async(req,res)=>{
    try {
        const image=req.file;
        const {name,id}=req.body;
        const imageUrl= await uploadImage(image)
        const category=await categoryModel.updateOne({_id:id},{
            name,
            image:imageUrl.url
        })
        if(!category)
        {
            return res.status(403).send({
            message:"Category Not Updated",
            success:false,
            error:true
            })
        }
        return  res.status(200).send({
            message:"Category Updated",
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

export const DeleteCategoryController=async(req,res)=>{
    try {
       
        const {id}=req.body;
        const category=await categoryModel.deleteOne({_id:id})
        if(!category)
        {
            return res.status(403).send({
            message:"Category Not Deleted",
            success:false,
            error:true
            })
        }
        return  res.status(200).send({
            message:"Category Deleted",
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