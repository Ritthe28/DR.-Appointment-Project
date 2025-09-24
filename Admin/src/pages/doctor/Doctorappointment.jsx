import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { Appcontext } from '../../context/Appcontext';
import { assets } from '../../assets/assets';

const Doctorappointment = () => {
    const {dtoken, appointments, getappointments, cancleappointment, completappointment} = useContext(Doctorcontext);
    const {calculateage,slotdateformat, currency}  = useContext(Appcontext)
    useEffect(()=>{
getappointments();
    },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p>
        All Appointments 

      </p>
      <div className='bg-white rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time </p>
          <p> Fees </p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map ((item, index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'  key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2 '> 
                <img className='w-8 rounded-full' src={item.userdata.image} alt="" />
                <p>{item.userdata.name}</p>
              </div>
              <div>
            <p className='text-xs inline border border-primary px-2 rounded-full'>  
              {item.paid?"online":"cash"}
            </p>
              </div>
              <p className='max-sm:hidden'>{calculateage(item.userdata.dob)}</p>
              <p>{slotdateformat(item.slotdate)}</p>
                <p>{currency}{item.amount}</p>

                {
                  item.cancelled?<p className='text-red-400 text-xs font-medium'> Cancelled </p>:item.iscomplited?<p className='text-green-500 text-xs font-medium'>Complited</p>:
                  <div className='flex'>
                  <img onClick={()=>cancleappointment(item._id)}   className='cursor-pointer' src={assets.cancel_icon} alt="" /><img onClick={()=>completappointment(item._id)
                  } className='cursor-pointer' src={assets.tick_icon} alt="" />
                </div>

                }
               
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Doctorappointment
