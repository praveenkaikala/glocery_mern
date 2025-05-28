


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
        method:"put",
    },
    resetPassword:{
        url:"/api/user/reset-password",
        method:"put",
    },
    getUserDetails:{
        url:"/api/user/get-user-details",
        method:"get",
    },
    verifyEmail:{
        url:"/api/user/verify-email",
        method:"get",
    },
    logOut:{
         url:"/api/user/logout",
           method:"get"
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"put",
    },
    updateDetails:{
        url:"/api/user/update-user",
        method:"put"
    },
    createCategory:{
         url:"/api/user/create-category",
         method:"post",
    }
}