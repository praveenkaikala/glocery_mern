import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import UserProfileEdit from '../components/UserProfileEdit';
import { toastError } from '../utils/toastError';
import { AxiosPravite } from '../utils/Axios';
import { summaryApi } from '../common/SummaryApi';
import { updateUser } from '../store/userSlice';
import { toastSuccess } from '../utils/toastSuccess';

const Profile = () => {
  const user=useSelector(state=>state?.user);
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false)
  const [userdetails,setUserDetails]=useState({
    name:user?.name,
    email:user?.email,
    mobile:user?.mobile

  })
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || ""
      });
    }
  }, [user]);
  const [openProfileEdit,setOpenProfileEdit]=useState(false)
  const handleChange=(e)=>{
    setUserDetails((prev)=>{
      return {
      ...prev,
      [e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const resp=AxiosPravite({
        ...summaryApi.updateDetails,
        data:userdetails
      })
      dispatch(updateUser(userdetails));
      toastSuccess(resp?.data?.message || "Detaills updated Successfully")
    } catch (error) {
    toastError("Failed To Update")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <section>
    <div className='w-20 h-20 rounded-full flex justify-center items-center'>
      {
        user?.avatar ? (
          <img src={user?.avatar} alt={user?.name} loading='lazy' className='w-full h-full overflow-hidden drop-shadow-sm rounded-full object-cover'/>
        ):(

          <FaUserCircle size={65}/>
        )
      }
    </div>
    
    <button className='min-w-20 border rounded-full  border-amber-300 my-2 cursor-pointer hover:border-amber-200 hover:text-white hover:bg-amber-300 transition-all ease-in-out' onClick={()=>{
      setOpenProfileEdit(true)
    }}>Edit</button>
    {
      openProfileEdit && (
        <UserProfileEdit close={()=>setOpenProfileEdit(false)}/>
      )
    }
    <form className="grid gap-3">
          <div className='grid gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className='bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2' value={userdetails?.name}  onChange={handleChange}/>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className=' bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2' value={userdetails?.email}  onChange={handleChange}/>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="name">Mobile</label>
            <input type="number" id="mobile" name="mobile" className=' bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2' value={userdetails?.mobile}  onChange={handleChange}/>
          </div>
          <button className='border border-amber-300 py-2 rounded-md hover:bg-amber-300 transition-all ease-in-out cursor-pointer' onClick={handleSubmit}>{loading?"saving....":"Save Datails"}</button>
          </form>
    </section>
  )
}

export default Profile