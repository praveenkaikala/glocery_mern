import { createSlice } from "@reduxjs/toolkit";


 const userSlice=createSlice({
    name:"user",
    initialState:{
        name:null,
        email:null,
        avatar:null,
        _id:null,
        last_login_date:null,
        verify_email:false,
        role:null,
        mobile:null,
           },
    reducers:{
        setUser:(state,action)=>{
            state.name=action.payload?.name
            state.email=action.payload?.email
            state.avatar=action.payload?.avatar
            state._id=action.payload?._id,
            state.last_login_date=action.payload?.last_login_date
            state.verify_email=action.payload?.verify_email,
            state.role=action.payload?.role,
            state.mobile=action.payload?.mobile
        },
        removeUser:(state)=>{
            state.name=null
            state.email=null
            state.avatar=null
            state._id=null
            state.last_login_date=null
            state.verify_email=null
            state.role=null
            state.mobile=null
        }
    }
})

export const {setUser,removeUser}=userSlice.actions
export default userSlice.reducer