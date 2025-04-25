export const baseApiUrl="http://localhost:5000/"

export const summaryApi={
    register:{
        url:"/api/user/register",
        method:"post",
        fields:{
            name:"name of custumer",
            email:"email of customer",
            password:"password"
        }
    },
    login:{
        url:"/api/user/login",
        method:"post",
        fields:{
            email:"email of customer",
            password:"password"
        }
    }
}