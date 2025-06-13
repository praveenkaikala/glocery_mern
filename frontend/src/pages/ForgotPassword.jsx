import React, { useState } from 'react'
import { toastError } from '../utils/toastError';
import { Link, useNavigate } from 'react-router-dom';
import { toastSuccess } from '../utils/toastSuccess';
import { AxiosPravite } from '../utils/Axios';
import { summaryApi } from '../common/SummaryApi';

const ForgotPassword = () => {
    const [userData, setUserData] = useState({
        email: ""
      });
      // const [showPassword,setShowPassword]=useState(false)
      const navigate=useNavigate()
      const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
      // const handleShowPassword=()=>{
      //   setShowPassword(!showPassword);
      // }
      const validate=Object.values(userData).every(el=>el)
    
      const handleSubmit=async (e)=>{
        e.preventDefault()
        if(!validate)
        {
            toastError("enter all fields")
            return
        }
        try {
           
            const response=await AxiosPravite({...summaryApi.forgotPassword,
              data:userData
            })
            toastSuccess(response?.data?.message)
            setUserData({
                email: "",
            })
            navigate("/verify-otp",{
              state:userData
            })
        } catch (error) {
            console.log(error)
            toastError(error?.response?.data?.message || "Something Went Wrong")
        }
      }
      return (
        <section className="container mx-auto w-full mt-5">
          <div className="bg-white max-w-lg mx-auto p-4">
            <p className="text-center text-xl font-semibold">Forgot Password</p>
            <form className="grid mt-6 gap-4">
              <div className="grid gap-1">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300"
                  onChange={handleChange}
                  value={userData.email}
                />
              </div>
        
              <button className={`${validate?"bg-green-800 hover:bg-green-700 ease-in-out duration-500" : "bg-gray-400"} w-full text-white py-2 rounded cursor-pointer`} onClick={handleSubmit}>Send OTP</button>
            </form>
            <p className="py-3 px-2 font-semibold">
              Back To Login ? <Link to={"/login"} className="text-green-800 hover:text-green-700 transition-all ease-in-out duration-300">Login</Link>
          </p>
          
          </div>
        </section>
    )
}

export default ForgotPassword