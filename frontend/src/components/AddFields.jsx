import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io';

const AddFields = ({close,fields,setFields,addFields}) => {
    const [name,setName]=useState("")
    const handleChange=(e)=>{
        const value=e.target.value
        setName(value)
    }
    const handleAddField=()=>{
        setFields(prev=>{
            return [...fields,name]
        })
        addFields(name)
        close()
    }
    const validate=name.length>0
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 z-100  p-4 flex  items-center justify-center ">
      <div className="bg-white max-w-sm w-full p-3 flex  flex-col gap-3 rounded-sm">
        <div className="w-full flex justify-between">
          <h2 className="font-semibold">Category</h2>
          <IoIosCloseCircle
            size={26}
            className="cursor-pointer hover:text-red-600 transition-all ease-in-out"
            onClick={() => close()}
          />
        </div>
        <div className="grid gap-2">
            <label htmlFor="field">Add Field</label>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="field"
              name="field"
              required
              placeholder="Enter Field Name"
            />
          </div>
          <div className='py-3'>
            <button
            className={`w-full py-2 border rounded cursor-pointer font-semibold  ${
              validate
                ? "bg-green-800 text-white hover:bg-green-700 transition-all ease-in-out "
                : "bg-gray-200"
            }`}
            onClick={handleAddField}
          >
            Add Field
          </button>
          </div>
      </div>
    </section>
  );
}

export default AddFields