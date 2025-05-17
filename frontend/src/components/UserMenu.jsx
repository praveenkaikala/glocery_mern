import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import { toastError } from '../utils/toastError'
import { AxiosPravite } from '../utils/Axios'
import { summaryApi } from '../common/SummaryApi'
import { removeUser } from '../store/userSlice'
import { toastSuccess } from '../utils/toastSuccess'

const UserMenu = () => {
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
  return (
    <div className='bg-white rounded shadow px-3 py-2 text-sm    min-w-52'>
        <div className='w-full'>
            <div className="font-semibold ">My Account</div>
            <div >
                {
                    user?.name || user?.mobile
                }
            </div>
            <Divider/>
            <div className='flex-col grid gap-2 mt-3'>
                <Link to={""}>My Orders</Link>
                <Link to={""}>Save Addresses</Link>
                <button className='w-full text-left cursor-pointer '  onClick={handleLogOut}>LogOut</button>
            </div>
        </div>
    </div>
  )
}

export default UserMenu