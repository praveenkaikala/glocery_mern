import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const UploadCategory = ({close}) => {
    const [data,setData]=useState({
        name:"",
        image:"",
        
    })
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60  p-4 flex  items-center justify-center ">
      <div className="bg-white max-w-sm w-full p-3 flex  flex-col justify-center items-center rounded-sm">
        <div className="w-full flex justify-end">
          <IoIosCloseCircle
            size={26}
            className="cursor-pointer hover:text-red-600 transition-all ease-in-out"
            onClick={() => close()}
          />
        </div>
      </div>
    </section>
  );
}

export default UploadCategory