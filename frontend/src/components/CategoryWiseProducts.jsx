import { useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { useSelector } from "react-redux"
import CardSkeleton from "./CardSkeleton"
import { summaryApi } from "../common/SummaryApi"
import { toastError } from "../utils/toastError"
import { validUrl } from "../utils/ValidUrl"
import { Link } from "react-router-dom"
import { AxiosPravite } from "../utils/Axios"
import CardProduct from "./CardProduct"
import useMobile from "../hooks/useMobile"

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state?.product?.subCategory)
  const [ismobile]=useMobile()
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await AxiosPravite({
                ...summaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            toastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

  

  const handleRedirectProductListpage = ()=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.categoryId.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
       if (!subcategory) return null;
      const url = `/${validUrl(name)}-${id}/${validUrl(subcategory?.name)}-${subcategory?._id}`

      return url
  }

  const redirectURL =  handleRedirectProductListpage()
    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link  to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
             { loading &&
                        <CardSkeleton number={ismobile ? 2 :6}/>
                    }
           {
            !loading && data.length>0 &&
             <div className='relative flex items-center '>
                <div className=' flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>


                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct
                                    data={p}
                                    key={p._id + "CategorywiseProductDisplay" + index}
                                />
                            )
                        })
                    }

                </div>
                <div className='w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
           }
        </div>
    )
}

export default CategoryWiseProductDisplay