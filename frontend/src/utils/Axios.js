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
