import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContaxt'
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"


const Myappointments = () => {
  const {backendurl,token}=useContext(AppContext)
  const [apid , setapid] = useState();

const [appointments , setappointments]= useState([]);
const months= ["","jan","feb","mar","apr","may","june", "jul","aug","sep","oct","nov", "dec"];


const slotdateformat =(slotdate)=>{
  const datearray= slotdate.split("-")
  return datearray[0]+" "+months[Number(datearray[1])] + " "+datearray[2];
}
const navigate = useNavigate();
const getuserappointments= async()=>{
try {
     const {data}= await axios.get(backendurl+"/api/user/appointments", {headers:{token}})
     if (data.success){
      setappointments(data.appointments.reverse());
      console.log(data.appointments);
     }
}catch(error){
  console.log(error);
  toast.error (error.message);
}
}
const cancleappointment = async (appointmentid)=>{
  try{
       const {data}=await axios.post(backendurl+"/api/user/cancleappointment", {appointmentid}, {
         headers:{token}
       })
       if (data.success){
        toast.success(data.message);
        getuserappointments();
       }else {
        toast.error(data.mesaage )
       }
  }catch (error){
    console.log(error);
    toast.error(error.message);
  }
}

const initpay = (order, appointmentid )=>{
   const options ={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID
,amount :order.amount,
currency:order.currency,
name :"appointmrnt payment",
description :"Appointment Payment",
order_id : order.id,
receipt :order.receipt,
handler :async(responce)=>{
  //  console.log(responce,"responce hotoy log ");
   try{
    const {data} = await axios.post(backendurl+"/api/user/varifyrazorpay", {responce, appointmentid}, {
      headers:{
        token
      }
    })
    if (data.success){
getuserappointments()
    }

   }catch(error){
    console.log(error);
    toast.error(error.message);
   }

}

   }   
   const rzp = new window.Razorpay(options) 
rzp.open();

}


const appointmentrazorpay =async(appointmentid )=>{
  try{
  const {data}= await axios.post(backendurl+"/api/user/paymentrazorpay",{appointmentid}, {headers:{token}} )
if (data.success){

  initpay(data.order,appointmentid);
  navigate("/myappointments")

}
  }catch (error ){
console.log(error);
toast.error(error.message )

  }
}
useEffect(()=>{
  getuserappointments();
},[token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 bordre-b'>My Appointments</p>
      <div>
        {appointments.map((item, index)=>{
{console.log(item);}

          return(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docdata.image} alt="" />
              </div>
           <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docdata.name}</p>
            <p>{item.docdata.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            {/* <p className='text-xs'>{item.address.line1}</p>
            <p className='text-xs '>{item.address.line2}</p> */}
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>
              Date and Time :</span>{slotdateformat(item.slotdate)}|{item.slottime}</p>
            <p></p>
           </div>
           <div>

           </div>
           <div className='flex flex-col gap-2 justify-end relative'> 
            {!item.cancelled && item.paid &&!item.iscomplited&&<> <button className='sm:min-w-48 py-2 border rounded text-stone-500 '>Paid</button> 
            <button onClick={()=>cancleappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300'>Cancle Appointement </button>
            </>}
            {!item.cancelled &&!item.paid && !item.iscomplited&&<>{!item.paid && <button  onClick={()=>{
              appointmentrazorpay(item._id)}} className=' top-5 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-primary hover:text-white transition-all duration-300'>Pay Online </button>}
              <button onClick={()=>cancleappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300'>Cancle Appointement </button>
            </>}
            {item.cancelled && !item.iscomplited&&< button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-red-700 text-white 
            cursor-default
            transition-all duration-300'>Appointment Cancelled </button> }
            {item.iscomplited&&<button className='text-green-500 border border-green-600 shadow-lg p-3 rounded-lg'>Complited </button>} 

           </div>
            </div>

          )
        }) }
      </div>
    </div>
  )
}

export default Myappointments
