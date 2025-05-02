import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toastError } from '../utils/toastError';
import { AxiosPravite } from '../utils/Axios';
import { summaryApi } from '../common/SummaryApi';
import { toastSuccess } from '../utils/toastSuccess';

const ResetPassword = () => {
    const location=useLocation();
    const navigate=useNavigate()
    const [userData, setUserData] = useState({
        password: "",
        confirmPassword: ""
      });
      const [showPassword,setShowPassword]=useState([false,false])
      const validate=Object.values(userData).every(el=>el)
      const handleShowPassword=(ind)=>{
        setShowPassword(prevState=>{
          const newState=[...prevState]
          newState[ind]=!newState[ind]
          return newState
        });
      }
      const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!validate)
        {
            toastError("Enter All Fields")
            return
        }
        try {
            if(userData.password!==userData.confirmPassword)
            {
                toastError("Password Not Matched")
                return
            }
            const response=await AxiosPravite({...summaryApi.resetPassword,
                data:{
                    newPassword:userData.password,
                    email:location?.state?.email
                }
            })
            toastSuccess(response?.data?.message)
            navigate("/login")
            setUserData({
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            toastError(error?.response?.data?.message || "Something Went Wrong")
            
        }
      }
    useEffect(() => {
        if (!location?.state?.response?.success) {
          navigate("/login");
        }
      }, [location]);
    const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
  return (
    <section className="container mx-auto w-full mt-5">
        <div className="bg-white max-w-lg mx-auto p-4">
          <p className="text-center text-2xl font-semibold">Reset Password</p>
          <form className="grid mt-6 gap-4">
            
            <div className="grid gap-1 relative">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                name="password"
                type={showPassword[0] ? "text" : "password"}
                className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300"
                onChange={handleChange}
                value={userData.password}
              />
              <div className="absolute right-0 top-10 px-2 cursor-pointer" onClick={()=>handleShowPassword(0)}>
                  {
                      showPassword[0] ? (
                          <FaEye />
                      ):(
  
                          <FaEyeSlash />
                      )
                  }
              </div>
              </div>
              <div className="grid gap-1 relative">
              <label htmlFor="password">ReEnter New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword[1] ? "text" : "password"}
                className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300"
                onChange={handleChange}
                value={userData.confirmPassword}
              />
              <div className="absolute right-0 top-10 px-2 cursor-pointer" onClick={()=>handleShowPassword(1)}>
                  {
                      showPassword[1] ? (
                          <FaEye />
                      ):(
  
                          <FaEyeSlash />
                      )
                  }
              </div>
                  
            </div>
            <button className={`${validate?"bg-green-800 hover:bg-green-700 ease-in-out duration-500" : "bg-gray-400"} w-full text-white py-2 rounded cursor-pointer`} onClick={handleSubmit}>Reset</button>
          </form>
          <p className="py-3 px-2 font-semibold">
            Don't Have Account ? <Link to={"/register"} className="text-green-800 hover:text-green-700 transition-all ease-in-out duration-300">Register</Link>
        </p>
        
        </div>
      </section>
  )
}

export default ResetPassword
