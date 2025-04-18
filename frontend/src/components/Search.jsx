import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
const Search = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const [isSearchpage,setIsSearchPage]=useState()
    useEffect(()=>{
        const isSearch=location.pathname==="/search"
        setIsSearchPage(isSearch)
        console.log(isSearch)
    },[location])
    const redirectToSearchPage=()=>{
        navigate("/search")
    }
  return (
    <div className="w-full border min-w-[300px] md:min-w-[400px] h-10 rounded flex items-center text-neutral-600 group focus-within:border-amber-300">
      <button className="flex h-full items-center p-3 text-neutral-600 group-focus-within:text-amber-300">
        <IoSearch size={20} />
      </button>
      <div className='w-full'>
        <div className='w-full'>
            {!isSearchpage ?
             <div onClick={redirectToSearchPage} className='w-full'>

             <TypeAnimation className='w-full'
               sequence={[
                 // Same substring at the start will only be typed out once, initially
                 "Search 'Milk'",
                 1000, // wait 1s before replacing "Mice" with "Hamsters"
                 "Search 'Sugar'",
                 1000,
                 "Search 'Chiken'",
                 1000,
                "Search 'Rice'",
                 1000,
                 "Search 'Chocolate'",
                 1000,
                 "Search 'Cake'",
                 1000
               ]}
               wrapper="span"
               speed={50}
               repeat={Infinity}
             />
             </div>
             :
             <div className='w-full'>

                <input type='text' placeholder='Search for ...' className='w-full outline-none' autoFocus={true}/>
                </div>
                }
        </div>
       
      </div>
    </div>
  );
}

export default Search