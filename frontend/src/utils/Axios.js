import axios from "axios"
import { baseApiUrl } from "../common/SummaryApi"

export const AxiosPravite=axios.create({
    baseURL:baseApiUrl,
    withCredentials:true
})


AxiosPravite.interceptors.request.use((config)=>{
    const token=localStorage.getItem("accesstoken")
    if(token)
    {
        config.headers["Authorization"]=`Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

AxiosPravite.interceptors.response.use((response)=>{
    return response
},async (error)=>{
    const originalConfig=error.config
    if(error?.response?.status===401 && !originalConfig._retry)
    {
        originalConfig._retry=true
        try {
            const response=await axios.get(`${baseApiUrl}/api/user/refresh-token`,{withCredentials:true})
            localStorage.setItem("accesstoken",response?.data?.data?.accessToken)
            return AxiosPravite(originalConfig)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})
