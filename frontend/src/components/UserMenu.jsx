import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import { toastError } from '../utils/toastError'
import { AxiosPravite } from '../utils/Axios'
import { summaryApi } from '../common/SummaryApi'
import { removeUser } from '../store/userSlice'
import { toastSuccess } from '../utils/toastSuccess'
import { IoIosLink } from "react-icons/io";
const UserMenu = ({close}) => {
    const user=useSelector(state=>state?.user)
    const dispatch=useDispatch()
    const handleLogOut=async()=>{
        try {
           const resp= await AxiosPravite({...summaryApi.logOut});
            dispatch(removeUser())
            localStorage.clear()
            toastSuccess(resp?.data?.message)
        } catch (error) {
            console.log(error)
            toastError(error?.response?.data?.message || "LogOut Failed")
        }
    }
    const handleClose=()=>{
        if(close)
        {

            close()
        }
    }
  return (
    <div className='bg-white rounded shadow px-3 py-2 text-sm    min-w-52'>
        <div className='w-full'>
            <div className="font-semibold ">My Account</div>
            <div className='flex gap-2 items-center'>
                <span className=' max-w-50 text-ellipsis line-clamp-1'>

                {
                    user?.name || user?.mobile
                }
                </span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-amber-300'><IoIosLink/></Link>
            </div>
            <Divider/>
            <div className='flex-col grid gap-2 mt-3'>
                <Link onClick={handleClose} to={"/dashboard/myorders"}>My Orders</Link>
                <Link onClick={handleClose} to={"/dashboard/address"}>Save Address</Link>
                <button className='w-full text-left cursor-pointer '  onClick={handleLogOut}>LogOut</button>
            </div>
        </div>
    </div>
  )
}

export default UserMenu