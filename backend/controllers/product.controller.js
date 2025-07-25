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


export const getAllProductsController = async(req,res)=>{
    try {
        
        let { page, limit, search } = req.body 

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

        return res.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return res.status(500).json({
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
         return res.status(400).json({
            message : "Provide Product Id",
            error : true,
            success : false
        })
    }
    const prod=await productModel.deleteOne({_id});
    if(!prod)
    {
        return res.status(403).json({
            message : "Product Not Deleted",
            error : true,
            success : false
        })
    }
     return res.status(200).json({
            message : "Product Deleted Successfully",
            error : true,
            success : false
        })
} catch (error) {
    return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
}
}


export const getProductByCategoryAndSubCategory  = async(req,res)=>{
    try {
        const { categoryId,subCategoryId,page,limit } = req.body

        if(!categoryId || !subCategoryId){
            return res.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : { $in :categoryId  },
            subcategory : { $in : subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            productModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            productModel.countDocuments(query)
        ])

        return res.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const getProductById=async(req,res)=>{
    try {
        const {productId}=req.body
        const product=await productModel.findById(productId)
        if(!product)
        {
            return res.status(404).json({
            message : "Product Not Found",
            error : true,
            success : false
        })
        }
        return res.status(200).send({
            message:"Product details",
            data:product,
            error:false,
            success:true
        })
    } catch (error) {
         return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const searchProduct=async(req,res)=>{
    try {
        let {search,page,limit}=req.body
        if(!page)
        {
            page=1
        }
        if(!limit)
        {
            limit=10
        }
        const query=search?{
            $text:{
                $search:search
            }
        }:{}
        const skip=(page-1)*limit
        const [data,dataCount]=await Promise.all([
            productModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit).populate("category subcategory"),
            productModel.countDocuments(query)


        ])
        return res.status(200).send({
            message:"product data",
            success:true,
            error:false,
            data:data,
            totalCount:dataCount,
            totalPage:dataCount/limit,
            page,
            limit
        })

    } catch (error) {
         return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}