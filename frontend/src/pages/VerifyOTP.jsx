import React, { useRef, useState } from 'react'
import { toastError } from '../utils/toastError';
import { Link, useNavigate } from 'react-router-dom';
import { toastSuccess } from '../utils/toastSuccess';
import { AxiosPravite } from '../utils/Axios';
import { summaryApi } from '../common/SummaryApi';

const VerifyOTP = () => {
    const [data, setData] = useState(["","","","","",""]);
      const navigate=useNavigate()
      const validate=data.every(el=>el)
      const inputref=useRef([])
      const handleSubmit=async (e)=>{
        e.preventDefault()
        if(!validate)
        {
            toastError("enter all fields")
            return
        }
        try {
            
            const response=await AxiosPravite({...summaryApi.forgotPassword,
              data:data
            })
            toastSuccess(response?.data?.message)
            setData([
                "","","","","",""
            ])
            navigate("/verify-otp")
        } catch (error) {
            console.log(error)
            toastError(error?.response?.data?.message || "Something Went Wrong")
        }
      }
      return (
        <section className="container mx-auto w-full mt-5">
          <div className="bg-white max-w-lg mx-auto p-4">
            <p className="text-center text-xl font-semibold">Enter OTP</p>
            <form className="grid mt-6 gap-4">
              <div className="grid gap-1">
                <label htmlFor="email">Enter Your Otp:</label>
                <div className='flex justify-between items-center gap-2 px-7 py-3'>

                {
                    data.map((el,index)=>(
                        <input
                        key={index}
                        ref={(ref)=>{
                           inputref.current[index]=ref
                           return ref; 
                        }}
                        id="otp"
                        type="text"
                        className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300 w-10 rounded-md text-center"
                            onChange={(e)=>
                            {
                                const value=e.target.value
                                if(value.length<=1 && value.match(/^[0-9]*$/))
                                {
                                    setData((prev)=>
                                        prev.map((el,ind)=>(ind===index?value:el))
                                    )
                                    console.log(data)
                                    
                                }
                                if(value && index<5 && value.match(/^[0-9]*$/))
                                {
                                    inputref.current[index+1].focus()
                                }
                            }
                            }
                            value={el}
                            maxLength={1}
                            onKeyDown={(e) => {
                                console.log(data[index])
                                if (e.key === "Backspace" && !data[index] && index > 0) {
                                  inputref.current[index - 1]?.focus();
                                }
                              }}
                      />
                    ))
                }
                </div>
              </div>
        
              <button className={`${validate?"bg-green-800 hover:bg-green-700 ease-in-out duration-500" : "bg-gray-400"} w-full text-white py-2 rounded cursor-pointer`} onClick={handleSubmit}>Verify OTP</button>
            </form>
            <p className="py-3 px-2 font-semibold">
              Back To Login ? <Link to={"/login"} className="text-green-800 hover:text-green-700 transition-all ease-in-out duration-300">Login</Link>
          </p>
          
          </div>
        </section>
    )
}

export default VerifyOTP