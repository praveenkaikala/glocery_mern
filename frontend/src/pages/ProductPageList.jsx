import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPageList = () => {
    const {category,subcategory}=useParams();
    console.log(category)
    console.log(subcategory)
  return (
    <div>ProductPageList</div>
  )
}

export default ProductPageList