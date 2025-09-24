import React, { useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'


const Doctorlist = () => {
  const {doctors,atoken, getalldoctors,chageavailability,backendurl} = useContext(Admincontext)

  useEffect(()=>{
if(atoken){ 
  getalldoctors()
}
  },[atoken])
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6 '>
        {
          doctors.map((item,index)=>{
             return(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group min-w-[200px]' key={index}>
              <img src={item.image}  alt="" className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 m-auto w-full min-h-[50%] max-h-[50%]' />
              <div  className='p-4'>
                <p  className='text-neutral-800 text-lg font-mediu'>{item.name}</  p>
              <p className=''>{item.speciality}</p>
              <div className='mt-2 items-center gap-1 text-sm '>
                <input onChange={()=>chageavailability(item._id)} type="checkbox" checked={item.available} />
                <p>available</p>
              </div>
              </div>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default Doctorlist
