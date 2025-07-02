import React from 'react'
import banner from "../assets/banner.jpg"
const Home = () => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
          <div className={`bg-green-100 w-full min-h-44 rounded ${!banner && "animate-pulse"}`}>
                 <img
                 src={banner}
                 className='w-full h-full'
                 alt='banner'
                 loading='lazy'
                 />
          </div>
      </div>
    </section>
  )
}

export default Home