import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"


export const cashOnDeliveryController=async(req,res)=>{
    try {
        const userId=req.userId
        const {list_items,totalAmt,address_id,sub_total_amount}=req.body



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