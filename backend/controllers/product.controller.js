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


export const getAllProductsController = async(request,response)=>{
    try {
        
        let { page, limit, search } = request.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            productModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subcategory'),
            productModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}



export const deleteProductController=async(req,res)=>{
try {
    const {_id}=req.body
    if(!_id)
    {
         return response.status(400).json({
            message : "Provide Product Id",
            error : true,
            success : false
        })
    }
    const prod=await productModel.deleteOne({_id});
    if(!prod)
    {
        return response.status(403).json({
            message : "Product Not Deleted",
            error : true,
            success : false
        })
    }
     return response.status(200).json({
            message : "Product Deleted Successfully",
            error : true,
            success : false
        })
} catch (error) {
    return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
}
}
