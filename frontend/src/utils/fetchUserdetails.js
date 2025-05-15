import { summaryApi } from "../common/SummaryApi"
import { AxiosPravite } from "./Axios"

export const fetchUserDatail=async()=>{
    try {
        const resp=await AxiosPravite({
            ...summaryApi.getUserDetails,
        })
        return resp?.data?.data
        // console.log("userdetails",resp?.data?.data)
    } catch (error) {
        console.log(error)
        
    }
}