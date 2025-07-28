import { useState } from "react"
import { Link } from "react-router-dom"
import { validUrl } from "../utils/ValidUrl"
import { pricewithDiscount } from "../utils/priceWithDiscount"
import { DisplayPriceInRupees } from "../utils/priceInRupees"
import AddToCartButton from "./AddToCartButton"

const CardProduct = ({data}) => {
    const url = `/product/${validUrl(data.name)}-${data._id}`
    const [loading,setLoading] = useState(false)
  
  return (
    <Link
  to={url}
  className='border p-2 grid gap-1 min-w-24 rounded bg-white cursor-pointer'
>
  <div className='min-h-12 max-h-16 overflow-hidden rounded'>
    <img
      src={data.image}
      className='w-full h-full object-contain scale-100'
    />
  </div>

  <div className='flex items-center gap-1'>
    <div className='text-[10px] px-1 py-px text-green-600 bg-green-50 rounded'>
      10 min
    </div>
    {Boolean(data.discount) && (
      <p className='text-[10px] px-1 text-green-600 bg-green-100 rounded'>
        {data.discount}% off
      </p>
    )}
  </div>

  <div className='text-xs font-medium line-clamp-2'>
    {data.name}
  </div>

  <div className='text-xs'>
    {data.unit}
  </div>

  <div className='flex items-center justify-between text-xs'>
    <div className='font-semibold'>
      {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
    </div>
    {/* Optionally enable stock or button here */}
     <div className=''>
          {
            data.stock == 0 ? (
              <p className='text-red-500 text-sm text-center'>Out of stock</p>
            ) : (
              <AddToCartButton data={data} />
            )
          }
            
        </div>
  </div>
</Link>

  )
}

export default CardProduct