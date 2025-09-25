import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";
import Stripe from "../utils/stripe.js";
export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}
export const cashOnDeliveryController = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, address_id, sub_total_amount } = req.body;
    const products = list_items.map((item) => {
      return {
        product_id: item.product_id._id,
        name: item.product_id.name,
        image: item.product_id.image,
        quantity: item.quantity,
      };
    });
    const order = await orderModel.insertOne({
      userId,
      orderId: `ord-${new mongoose.Types.ObjectId()}`,
      products,
      payment_status: "Pending",
      delivery_address: address_id,
      total_amount: totalAmt,
      sub_total_amount,
    });
    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: { shopping_cart: [] },
        $push: { order_history: order._id },
      }
    );
    await cartModel.deleteMany({ user_id: userId });
    return res.status(200).json({
      message: "Order Successfull",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const onlinePaymentController=async(req,res)=>{
  try {
    const userId = req.userId;
    const user=await userModel.find({_id:userId})
    const { list_items, totalAmt, address_id, sub_total_amount } = req.body;
    const line_items = list_items.map((item) => {
      return {
       price_data: {
        currency: 'usd',
        product_data: {
          name: item.product_id.name,
        },
        unit_amount: pricewithDiscount(item.product_id.price,item.product_id.discount),
      },
      quantity: item.quantity,
      };
    });
    const perams={
      line_items,
      submit_type:'pay',
      mode:'payment',
      payment_method_types:['card'],
      customer_email:user.email,
      metadata:{
        userId:userId,
        addressid:address_id
      },
      success_url:`${process.env.FRONTEND_URL_LOCAL}/success`,
      cancel_url:`${process.env.FRONTEND_URL_LOCAL}/cancel`
    }
    const session= await Stripe.checkout.sessions.create(perams)
    return res.status(200).send({
      message:"pending",
      data:session,
      success:true,
      error:false
    })

  } catch (error) {
     return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    }); 
  }
}