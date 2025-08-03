import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import addressReducer from "./addressSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer
  },
  devTools:true,
})