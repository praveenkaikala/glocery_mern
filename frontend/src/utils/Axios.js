import axios from "axios"
import { baseApiUrl } from "../common/SummaryApi"

export const AxiosPravite=axios.create({
    baseURL:baseApiUrl,
    withCredentials:true
})