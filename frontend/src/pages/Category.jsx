import React, { useState } from 'react'
import UploadCategory from '../components/UploadCategory'

const Category = () => {
    const [showUploadCategory,setShowUploadCategory]=useState(false)
  return (
    <section>
        <div className='p-2 container bg-white shadow flex items-center gap-4'>
            <h2 className='font-semibold'>Category</h2>
            <button className='border border-amber-300 hover:bg-amber-300 transition-all ease-in-out rounded py-1 px-2 cursor-pointer' onClick={()=>setShowUploadCategory(true)}>Add Category</button>
        </div>
        {
            showUploadCategory && <UploadCategory close={()=>setShowUploadCategory(false)}/>
        }
    </section>
  )
}

export default Category