import React from 'react'
import noData from "../assets/nodata.webp"
const NoData = () => {
  return (
    <div className='flex justify-center flex-col items-center'>
        <img
        src={noData}
        loading='lazy'
        className='w-50'
        />
        <h2 className='font-semibold text-xl'>No Data</h2>
    </div>
  )
}

export default NoData