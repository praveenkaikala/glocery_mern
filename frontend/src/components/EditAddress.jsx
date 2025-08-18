import { useGlobalContext } from "../provider/Provider"
import { useForm } from "react-hook-form";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import { IoClose } from "react-icons/io5";
import { toastSuccess } from "../utils/toastSuccess";
import { toastError } from "../utils/toastError";
import { useEffect } from "react";
const EditAddress = ({close,data}) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues:{
            pincode:data?.pincode,
             city:data?.city,
              state:data?.state,
             country:data?.country,
              addressline:data?.address_line,
              mobile:data?.mobile
        }
    })
    const { fetchAddress } = useGlobalContext()
useEffect(()=>{
    document.body.style.overflow="hidden"
    return ()=>{
        document.body.style.overflow="auto"
    }
},[])
    const onSubmit = async(edata)=>{
        console.log("data",edata)
    
        try {
            const response = await AxiosPravite({
                ...summaryApi.updateAddress,
                data : {
                    id:data?._id,
                    address_line :edata.addressline,
                    city : edata.city,
                    state : edata.state,
                    country : edata.country,
                    pincode : edata.pincode,
                    mobile : edata.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toastSuccess(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            toastError(error)
        }
    }
  return (
    <section className='bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50  h-screen overflow-auto z-100'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            <div className='flex justify-between items-center gap-4'>
                <h2 className='font-semibold'>Add Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
            </div>
            <form className='mt-4 grid md:grid-cols-2 grid-cols-1 gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressline'>Address Line :</label>
                    <input
                        type='text'
                        id='addressline' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("addressline",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city'>City :</label>
                    <input
                        type='text'
                        id='city' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("city",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state'>State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("state",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='pincode'>Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("pincode",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='country'>Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("country",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='mobile'>Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("mobile",{required : true})}
                    />
                </div>

                <button type='submit' className='bg-green-700 w-full md:col-span-2  py-2 font-semibold mt-4 hover:bg-green-600 cursor-pointer rounded '>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default EditAddress