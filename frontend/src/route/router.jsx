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
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import Product from "../pages/Product";
import { Uploadproduct } from "../pages/Uploadproduct";
import Permission from "../layouts/Permission";
import AdminProduct from "../pages/AdminProduct";

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
            ,{
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"myorders",
                        element:<MyOrders/>
                    },
                    {
                        path:"address",
                        element:<Address/>
                    },
                    {
                        path:"category",
                        element:<Permission><Category/></Permission>
                    },
                    {
                        path:"sub-category",
                        element:<Permission><SubCategory/></Permission>
                    },
                    {
                        path:"product",
                        element:<Permission><AdminProduct/></Permission>
                    },
                    {
                        path:"upload-product",
                        element:<Permission><Uploadproduct/></Permission>
                    }
                ]
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
    

])