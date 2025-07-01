import React, { useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import { summaryApi } from '../common/SummaryApi'
import { IoSearchOutline } from 'react-icons/io5'
import SkeletonLoader from '../components/SkeletonLoader'
import ProductCardAdmin from '../components/ProductCardAdmin'

const AdminProduct = () => {
      const [perams,setPerams]=useState({
        page:1,
        limit:10,
        search:""
      })
      const [products,loading,refetchData]=useFetchData(summaryApi.getAllProducts(perams),[perams])
      console.log(products)
  return (
   <section className=''>
        <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
                <h2 className='font-semibold'>Product</h2>
                <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
                  <IoSearchOutline size={25}/>
                  <input
                    type='text'
                    placeholder='Search product here ...' 
                    className='h-full w-full  outline-none bg-transparent'
                    value={perams.search}
                    // onChange={handleOnChange}
                  />
                </div>
        </div>
        {
          loading && (
            <SkeletonLoader/>
          )
        }


        <div className='p-4 bg-blue-50'>


            <div className='min-h-[55vh]'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {
                  products.map((p,index)=>{
                    return(
                      <ProductCardAdmin data={p} fetchProductData={refetchData}  key={index}/>
                    )
                  })
                }
              </div>
            </div>
            
            {/* <div className='flex justify-between my-4'>
              <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
              <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
              <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
            </div> */}

        </div>
          

      
    </section>
  )
}

export default AdminProduct