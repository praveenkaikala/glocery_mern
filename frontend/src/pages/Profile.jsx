import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import UserProfileEdit from '../components/UserProfileEdit';

const Profile = () => {
  const user=useSelector(state=>state?.user);
  const [openProfileEdit,setOpenProfileEdit]=useState(false)
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
    </section>
  )
}

export default Profile