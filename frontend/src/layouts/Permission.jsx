import React from 'react'
import { useSelector } from 'react-redux'

const Permission = ({children}) => {
    const user=useSelector(state=>state?.user)
  return user.role==="Admin"?children : <div>
    <p className='text-xl text-red text-center'>Do Not Have Permisson</p>
  </div>
}

export default Permission