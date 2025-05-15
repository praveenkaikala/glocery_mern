import { createSlice } from "@reduxjs/toolkit";


 const userSlice=createSlice({
    name:"user",
    initialState:{
        name:null,
        email:null,
        avatar:null,
        _id:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.name=action.payload?.name
            state.email=action.payload?.email
            state.avatar=action.payload?.avatar
            state._id=action.payload?._id
        },
        removeUser:(state)=>{
            state.name=null
            state.email=null
            state.avatar=null
            state._id=null
        }
    }
})

export const {setUser,removeUser}=userSlice.actions
export default userSlice.reducer