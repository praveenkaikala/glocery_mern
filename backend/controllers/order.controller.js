import mongoose from "mongoose"
import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"


export const cashOnDeliveryController=async(req,res)=>{
    try {
        const userId=req.userId
        const {list_items,totalAmt,address_id,sub_total_amount}=req.body
        const products=list_items.map((item)=>{
            return {
                product_id:item.product_id._id,
                name:item.product_id.name,
                image:item.product_id.image,
                quantity:item.quantity
            }
        })
        const order=await orderModel.insertOne({
            userId,
            orderId:`ord-${new mongoose.Types.ObjectId()}`,
            products,
            payment_status:"Pending",
            delivery_address:address_id,
            total_amount:totalAmt,
            
        })
        return res.status(200).json({
            message : "Order Successfull",
            error : false,
            success : true
        }) 
            // userId:
            // orderId:
            // product_id:
            // product_details:
            // payment_id:
            // payment_status:
            // delivery_address:
            // sub_total_amount:
            // total_amount:
            // invoice_recipt:
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        }) 
    }
}