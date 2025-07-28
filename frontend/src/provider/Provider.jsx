import { AxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AxiosPravite } from '../utils/Axios';
import { summaryApi } from '../common/SummaryApi';
import { toastError } from '../utils/toastError';
import { toastSuccess } from '../utils/toastSuccess';
import { handleAddItemCart } from '../store/cartSlice';
import { MdWifiCalling } from 'react-icons/md';
import { pricewithDiscount } from '../utils/priceWithDiscount';
const contextProvider=createContext(null);

export const useGlobalContext=()=>useContext(contextProvider)
const Provider = ({children}) => {
    const cart=useSelector((state)=>state?.cart.cart);
    const dispatch=useDispatch()
    const [totalPrice,setTotalPrice] = useState(0)
     const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)
    const fetchCartItem = async()=>{
        try {
          const response = await AxiosPravite({
            ...summaryApi.getCartItem
          })
          const { data : responseData } = response
    
         console.log("calling1")
            dispatch(handleAddItemCart(responseData.data))
            console.log("calling")
            console.log(responseData)
    
        } catch (error) {
          console.log(error)
        }
    }
const updateCartItem = async(id,qty)=>{
      try {
          const response = await AxiosPravite({
            ...summaryApi.updateCartItemQty,
            data : {
              _id : id,
              qty : qty
            }
          })
          const { data : responseData } = response

          if(responseData.success){
              toastSuccess(responseData.message)
              fetchCartItem()
              return responseData
          }
      } catch (error) {
        toastError(error.response.data.message)
        return error
      }
    }
    const deleteCartItem = async(cartId)=>{
      try {
          const response = await AxiosPravite({
            ...summaryApi.deleteCartItem,
            data : {
              _id : cartId
            }
          })
          const { data : responseData} = response

          if(responseData.success){
        (responseData.message)
            fetchCartItem()
          }
      } catch (error) {
         toastError(error.response.data.message)
      }
    }
    useEffect(()=>{
      const qty = cart.reduce((preve,curr)=>{
          return preve + curr.quantity
      },0)
      setTotalQty(qty)
      
      const tPrice = cart.reduce((preve,curr)=>{
          const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)

          return preve + (priceAfterDiscount * curr.quantity)
      },0)
      setTotalPrice(tPrice)

      const notDiscountPrice = cart.reduce((preve,curr)=>{
        return preve + (curr?.productId?.price * curr.quantity)
      },0)
      setNotDiscountTotalPrice(notDiscountPrice)
  },[cart])
  return (
   <contextProvider.Provider value={{
    fetchCartItem,
    updateCartItem,
    deleteCartItem,
    totalPrice,
    totalQty,
    notDiscountTotalPrice
   }}>
   {children}
   </contextProvider.Provider>
  )
}

export default Provider