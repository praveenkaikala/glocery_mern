import React, { useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import { summaryApi } from '../common/SummaryApi'

const Product = () => { 
  const [set,setSet]=useState(1)
  const [products]=useFetchData(summaryApi.getAllProducts(set),[set])
  console.log(products)
  return (
    <div onClick={()=>{
      console.log("state")
      setSet((prev)=>prev+1)
    }}>Product</div>
  )
}

export default Product