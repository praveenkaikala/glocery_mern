import React, { useEffect, useState } from 'react'

const useMobile = (breakPoint=766) => {
    const [isMobile,setIsMobile]=useState(window.innerWidth<breakPoint)
     const handleResize=()=>{
        setIsMobile(window.innerWidth<breakPoint);
     }
     useEffect(()=>{
        handleResize()

        window.addEventListener('resize',handleResize)
        
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])
     return [isMobile]
}

export default useMobile
