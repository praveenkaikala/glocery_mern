import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    category:[],
    subCategory:[],
    product:[]
}

const productSlice=createSlice({
    name:"product",
    initialState:initialValue,
    

})