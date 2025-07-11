import React, { useEffect, useState } from 'react'
import { AxiosPravite } from '../utils/Axios'

const useFetchData = (urldata,dep=[]) => {
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const fetchData=async()=>{
        try {
            setLoading(true)
            const resp=await AxiosPravite({
                ...urldata
            })
            setData(resp?.data)
            // console.log(resp.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[refresh,...dep])
    const refetchData=()=>{
        setRefresh(!refresh)
    }
  return [data,loading,refetchData];
}

export default useFetchData