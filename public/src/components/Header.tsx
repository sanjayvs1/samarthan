import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate= useNavigate();
  return (
    <div className="absolute top-0 left-0 w-full flex items-center p-4 bg-transparent z-10">
        {/* Profile icon */}
        <FaUserCircle className="text-4xl text-gray-700 cursor-pointer" onClick={()=>{navigate('/your-profile')}} />
      </div>
  )
}

export default Header
