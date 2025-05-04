import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess } from "../utils/toastSuccess";
import { toastError } from "../utils/toastError";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validate = Object.values(userData).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate) {
      toastError("enter all fields");
      return;
    }
    try {
      const response = await AxiosPravite({
        ...summaryApi.login,
        data: userData,
      });
      toastSuccess(response?.data?.message);
      setUserData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toastError(error?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <section className="container mx-auto w-full">
      <div className="bg-white max-w-lg mx-auto p-4">
        <p className="text-center text-2xl font-semibold">
          Login To Your Account
        </p>
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
            <div
              className="absolute right-0 top-10 px-2 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <p className="py-1 px-2 text-right text-md">
              <Link
                to={"/forgot-password"}
                className="text-green-800 hover:text-amber-200 transition-all ease-in-out duration-300"
              >
                Forgot Password ?
              </Link>
            </p>
          </div>
          <button
            className={`${
              validate
                ? "bg-green-800 hover:bg-green-700 ease-in-out duration-500"
                : "bg-gray-400"
            } w-full text-white py-2 rounded cursor-pointer`}
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="py-3 px-2 font-semibold">
          Don't Have Account ?{" "}
          <Link
            to={"/register"}
            className="text-green-800 hover:text-green-700 transition-all ease-in-out duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
