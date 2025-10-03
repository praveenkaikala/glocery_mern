import { createSlice } from "@reduxjs/toolkit"

const initialValue=[]

const orderSlice=createSlice({
    name:"orders",
    initialState:initialValue,
    reducers:{
        setOrders:(state,action)=>{
           
                return [...action.payload]
               
           
        },
      
    }

})

export const {setOrders}=orderSlice.actions
export default orderSlice.reducer