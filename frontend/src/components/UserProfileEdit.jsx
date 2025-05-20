import { AxiosError } from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../utils/toastError";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import { toastSuccess } from "../utils/toastSuccess";
import { IoIosCloseCircle } from "react-icons/io";
import { updateAvatar } from "../store/userSlice";
const UserProfileEdit = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const [loading,setLoading]=useState(false)
  const [avatar,setAvatar]=useState(null)
  const dispatch=useDispatch();
  const handleSubmit=async()=>{
    if(!avatar)
    {
        toastError("Select Avatar To Upload")
        return
    }
    try{
        setLoading(true)
        const formdata=new FormData()
        formdata.append("avatar",avatar)
        const resp=await AxiosPravite({...summaryApi.uploadAvatar,
            data:formdata
        })
        console.log(resp?.data?.data)
        dispatch(updateAvatar(resp?.data?.data?.url));
        toastSuccess(resp?.data?.message || "Avatar Updated Successfully")
    }
    catch(error)
    {
        console.log(error)
        toastError(error || "Avatar does not update")
    }
    finally{
        setLoading(false);
        close()
    }
  }
  const handleAvatarChange=(e)=>{
        const image=e.target.files[0];
        setAvatar(image);
        console.log(image)
        
        
  }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60  p-4 flex  items-center justify-center ">
      <div className="bg-white max-w-sm w-full p-3 flex  flex-col justify-center items-center rounded-sm">
        <div className="w-full flex justify-end">
            <IoIosCloseCircle size={26} className="cursor-pointer hover:text-red-600 transition-all ease-in-out" onClick={()=>close()}/>
        </div>
        <div className="w-20 h-20 rounded-full flex justify-center items-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              loading="lazy"
              className="w-full h-full overflow-hidden drop-shadow-sm rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={65} />
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="uploadimage">
            <div className="min-w-20 border rounded-full  border-amber-300 my-2 cursor-pointer hover:border-amber-200 hover:text-white hover:bg-amber-300 transition-all ease-in-out text-center">
              Upload
              
            </div>
          </label>
          <input type="file" className="hidden" onChange={handleAvatarChange} id="uploadimage" />
        </form>
        <button className="py-2 px-3 bg-green-800 cursor-pointer text-white rounded" onClick={handleSubmit}>
            {
                loading?"Saving...":"Save Avatar"
            }
        </button>
      </div>
    </section>
  );
};

export default UserProfileEdit;
