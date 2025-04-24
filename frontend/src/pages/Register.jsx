import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword,setShowPassword]=useState(false)
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

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    console.log(userData)
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
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300"
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
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300"
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
      </div>
    </section>
  );
};

export default Register;
