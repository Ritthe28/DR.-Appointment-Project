import React, { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Doctorcontext } from '../context/Doctorcontext';

const Sidebar = () => {
  const {atoken}= useContext(Admincontext);
 const {dtoken}= useContext(Doctorcontext)

  return (
    <div className='min-h-screen bg-white border-r'>
{
 atoken&&<ul className='text-[#515151]'>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary':null}`} to ={"/admindashboard"}>
      <img src={assets.home_icon} alt="" />
      <p className='hidden md:block'>Dashboard</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#b0b5e4] border-r-4 border-primary':null}`} to={"allapointments"}>
      <img src={assets.appointment_icon} alt="" />
      <p className='hidden md:block'>Appointements</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary':null}`} to={"/adddoctor"}>
      <img src={assets.add_icon} alt="" />
      <p className='hidden md:block'>Add Doctor</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary':null}`} to={"doctorlist"}>
      <img src={assets.people_icon} alt="" />
      <p className='hidden md:block'>Doctorlist</p>
    </NavLink>
  </ul>
}     


{
 dtoken&&<ul className='text-[#515151]'>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary':null}`} to ={"/doctordashboard"}>
      <img src={assets.home_icon} alt="" />
      <p className='hidden md:block'>Dashboard</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#b0b5e4] border-r-4 border-primary':null}`} to={"doctorappointment"}>
      <img src={assets.appointment_icon} alt="" />
      <p className='hidden md:block'>Appointements</p>
    </NavLink>
  
    <NavLink className={({isActive})=>`flex text-center gap-3  py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary':null}`} to={"doctorprofile"}>
      <img src={assets.people_icon} alt="" />
      <p className='hidden md:block'>Profile</p>
    </NavLink>
  </ul>
}      

    </div>
  )
}

export default Sidebar    
   