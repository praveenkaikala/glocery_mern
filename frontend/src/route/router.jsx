import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/search",
                element:<SearchPage/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/forgot-password",
        element:<ForgotPassword/>
    },
    {
        path:"/verify-otp",
        element:<VerifyOTP/>
    },
    {
        path:"reset-password",
        element:<ResetPassword/>
    }
    ,{
        path:"dashboard",
        element:<Dashboard/>,
        children:[
            {
                path:"profile",
                element:<Profile/>
            }
        ]
    }

])