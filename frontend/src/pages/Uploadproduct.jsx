import React, { useState } from 'react'

export const Uploadproduct = () => {
  const [data,setData]=useState({
    name:"",
    image:[],
    category:[],
    subcategory:[],
    unit:"",
    stock:null,
    price:null,
    discount:null,
    discription:"",
    more_details:"",
    publish
  })
  return (
     <section>
      <div className="p-2 container bg-white shadow flex items-center gap-4">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      </section>
  )
}
