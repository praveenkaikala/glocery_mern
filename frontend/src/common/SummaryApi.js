


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
    },
    getCategotyList:{
        url:"/api/user/get-category",
        method:"get"
    },
    updateCategory:{
        url:"/api/user/update-category",
        method:"put"
    },
    deleteCategoty:{
        url:"/api/user/delete-category",
        method:"delete"
    },
    createSubCategory:{
        url:"/api/user/create-subcategory",
        method:"post"
    },
     getSubCategory:{
        url:"/api/user/get-subcategory",
        method:"get"
    },
    deleteSubCategoty:{
        url:"/api/user/delete-subcategory",
        method:"delete"
    },
    updateSubCategory:{
        url:"/api/user/update-subcategory",
        method:"put"
    },
    uploadProduct:{
        url:"/api/user/product",
        method:"post"
    },
    getAllProducts:(perams)=>{
        return {
             url:"/api/user/get-product",
             method:"post",
             data:{
                ...perams
             }
        }
    },
    deleteProduct:{
        url:"/api/user/delete-product",
        method:"delete"
    },
    getProductByCategory:{
        url:"/api/user/get-product-by-category",
        method:"post"
    },
    getProductByCategoryAndSubCategory:{
        url:"api/user/get-pruduct-by-category-and-subcategory",
        method:"post"
    },
    getProductById:{
        url:"api/user/get-product-by-id",
        method:"post"
    },
    searchProduct:{
        url:"api/user/search-product",
        method:"post"
    },
    addTocart : {
        url : "/api/user/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/user/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/user/cart/update-qty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/user/cart/delete-cart-item',
        method : 'delete'
    },
    createAddress : {
        url : '/api/user/address/create',
        method : 'post'
    },
    getAddress:{
        url : '/api/user/address/get',
        method : 'get'
    },
    updateAddress:{
        url : '/api/user/address/update',
        method : 'put'
    },
    deleteAddress:{
        url : '/api/user/address/delete',
        method : 'delete'
    },
     cod:{
        url : '/api/user/order/cod',
        method : 'post'
    }, 
    onlinePayment:{
        url : '/api/user/order/online',
        method : 'post'
    }
}