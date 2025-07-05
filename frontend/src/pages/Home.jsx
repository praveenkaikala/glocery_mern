import React from 'react'
import banner from "../assets/banner.jpg"
import mobileBanner from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import CardSkeleton from '../components/CardSkeleton'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProducts'
import { validUrl } from '../utils/ValidUrl'
const Home = () => {
  const category=useSelector((state)=>state?.product?.category)
  const subCategory=useSelector((state)=>state?.product?.subCategory)
  const navigate=useNavigate()
  const categoryLoading=useSelector((state)=>state?.product?.loadingCategory)
  const handleRedirect=async(id,name)=>{
      const subcatData= subCategory.find((sub)=>{
        return sub.categoryId?.some((cat)=>{
          return cat._id==id
        })
      })
      const url=`/${validUrl(name)}-${id}/${validUrl(subcatData?.name)}-${subcatData._id}`;
      navigate(url)
  } 
  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
          <div className={` w-full min-h-44 rounded ${!banner && "animate-pulse bg-green-100"}`}>
                 <img
                 src={banner}
                 className='w-full h-full md:block hidden'
                 alt='banner'
                 loading='lazy'
                 />
                 <img
                 src={mobileBanner}
                 className='w-full h-full md:hidden object-fit'
                 alt='banner'
                 loading='lazy'
                 />
          </div>
      </div>
      <div className='container mx-auto px-4'>
       <h2 className='font-bold text-lg'>Shop By Category</h2>
       {
        categoryLoading ?  
        <CardSkeleton number={10}/>
       :
        <div className="grid gap-4 md:grid-cols-8 sm:grid-cols-6 grid-cols-2 py-3 container mx-auto -z-10">


         {
           category.map((cat,ind)=>{
             return(
              <div key={ind} onClick={()=>handleRedirect(cat._id,cat.name)}>
                   <div className='cursor-pointer hover:scale-[1.1] transition-all ease-in-out '>
                     <img src={cat.image} alt={cat.name} className='w-full h-full'/>
                     </div>
              </div>
             )
           })
         }
        </div>
       }
        
      </div>
      <div className='px-6'>
         {
       category &&
        category?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={index} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }
      </div>
    </section>
  )
}

export default Home