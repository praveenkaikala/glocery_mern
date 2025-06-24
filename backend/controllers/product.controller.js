import productModel from "../models/product.model.js";
import { uploadImage } from "../utils/uploadImage.js";

export const uploadProductController=async(req,res)=>{
    try {
        const image=req.file
        const {name,category,subcategory,unit,price,discount,discription,more_details,publish,stock}=req.body;
        if(!name || !category || !subcategory || !unit || !price || !discount || !discription || !stock)
        {
            return res.status(400).send({
            message:"Provide name,category,subcategory,unit,price,discount,discription,more_details,publish,stock",
            success:false,
            error:true
        })
        }
         const imageUrl= await uploadImage(image)
         const product=await productModel.create({
            name,
            unit,
            price,
            discount,
            stock,
            discription,
            image:imageUrl.url,
            category:JSON.parse(category),
            subcategory:JSON.parse(subcategory),
            more_details:JSON.parse(more_details),
            publish

         })
         if(!product)
         {
            return res.status(403).send({
            message:"Product Not Created",
            success:false,
            error:true
            })
         }
         return  res.status(201).send({
            message:"New Product Created",
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