import React, { useEffect, useState } from 'react'
import { AxiosPravite } from '../utils/Axios'

const useFetchData = (urldata) => {
    const [data,setData]=useState([])
    const fetchData=async()=>{
        try {
            const resp=await AxiosPravite({
                ...urldata
            })
            console.log(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    })
  return data;
}

export default useFetchData