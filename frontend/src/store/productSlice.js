import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    category:[],
    subCategory:[],
    product:[],
    loadingCategory:true
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
           
        },
        setLoadingCategory:(state,action)=>{
            state.loadingCategory=action.payload
        }
    }

})

export const {setCategory,setProduct,setSubCategory,setLoadingCategory}=productSlice.actions
export default productSlice.reducer