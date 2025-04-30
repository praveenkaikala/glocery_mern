export const baseApiUrl="http://localhost:5000"

export const summaryApi={
    register:{
        url:"/api/user/register",
        method:"post"
    },
    login:{
        url:"/api/user/login",
        method:"post",
    },
    forgotPassword:{
        url:"/api/user/forgot-password",
        method:"put",
    },
    verifyOtp:{
        url:"/api/user/verify-otp",
        method:"post",
    },
}