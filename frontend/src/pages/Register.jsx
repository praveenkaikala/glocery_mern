
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import { toastError } from "../utils/toastError";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess } from "../utils/toastSuccess";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  const validate=Object.values(userData).every(el=>el)

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!validate)
    {
        toast.error("Enter All Fields")
        return
    }
    try {
        
        const response=await AxiosPravite({...summaryApi.register,
          data:userData
        })
        toastSuccess(response?.data?.message)
        setUserData({
            name: "",
            email: "",
            password: ""
        })
        navigate("/login")
    } catch (error) {
        toastError(error?.response?.data?.message || "Something Went Wrong")
    }
  }
  return (
    <section className="container mx-auto w-full">
      <div className="bg-white max-w-lg mx-auto p-4">
        <p className="text-center text-2xl font-semibold">Welcome To Blinkit</p>
        <form className="grid mt-6 gap-4">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoFocus
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300  rounded"
              onChange={handleChange}
              value={userData.name}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded"
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="grid gap-1 relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded"
              onChange={handleChange}
              value={userData.password}
            />
            <div className="absolute right-0 top-10 px-2 cursor-pointer" onClick={handleShowPassword}>
                {
                    showPassword ? (
                        <FaEye />
                    ):(

                        <FaEyeSlash />
                    )
                }
            </div>
          </div>
          <button className={`${validate?"bg-green-800 hover:bg-green-700 ease-in-out duration-500" : "bg-gray-400"} w-full text-white py-2 rounded cursor-pointer`} onClick={handleSubmit}>Register</button>
        </form>
        <p className="py-3 px-2 font-semibold">
            Already Have Account ? <Link to={"/login"} className="text-green-800 hover:text-green-700 transition-all ease-in-out duration-300">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
