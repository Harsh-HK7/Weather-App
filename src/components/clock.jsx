import React from 'react';
import { useEffect, useState} from "react";

const clock = () => {

    const [currentTime , setCurrentTime] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000)
        return () => clearInterval(timer)
    })

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl md:text-7xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</h1>
      <p className="text-sm md:text-md font-medium">{new Date().toLocaleDateString()}</p>
    </div>
  )
};
export default clock
