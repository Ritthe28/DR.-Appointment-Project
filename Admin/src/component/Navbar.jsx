import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Admincontext } from '../context/Admincontext'
import { Doctorcontext } from '../context/Doctorcontext';

const Navbar = () => {

const {atoken, setatoken}=     useContext(Admincontext);

const {setdtoken, dtoken} = useContext(Doctorcontext)


const logout = ()=>{
    console.log("hellooo")
    atoken && setatoken("")
    atoken&&  localStorage.removeItem("atoken")
    dtoken && setdtoken("")
    dtoken && localStorage.removeItem("dtoken")
}

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken?'Admin':'Doctor'}</p>
      </div>
      <button onClick={()=>logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
