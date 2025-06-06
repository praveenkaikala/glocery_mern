import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    category:[],
    subCategory:[],
    product:[]
}

const productSlice=createSlice({
    name:"product",
    initialState:initialValue,
    reducers:{
        setCategory:(state,action)=>{
           
                state.category=[...action.payload]
           
        },
        setSubCategory:(state,action)=>{
           
                state.subCategory=[...action.payload]
           
        },
        setProduct:(state,action)=>{
           
                state.product=[...action.payload]
           
        }
    }

})

export const {setCategory,setProduct,setSubCategory}=productSlice.actions
export default productSlice.reducer