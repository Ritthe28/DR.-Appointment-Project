import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext.jsx'
import { Appcontext } from '../../context/Appcontext.jsx';
import { assets } from '../../assets/assets.js';
// import { cancleappointment } from '../../../../Original_Backend/controlers/usercontroller.js';


const Allappointment = () => {
const {atoken,appointments,getallappointments,cancleappointment}= useContext(Admincontext);
const {calculateage,slotdateformat,currency}= useContext(Appcontext);


useEffect(()=>{
  if  (atoken){
    getallappointments()
  }

},[atoken])
console.log(appointments);

  return (
    <div className='w-full max-w-6xl m-5'>   
      <p  className='mb-3 text-lg font-medium'>AllAppointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[6ovh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr,3fr,1fr,3fr,3fr,1fr,1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p> Age </p>
          <p>Date & Time </p>  
          <p> Doctor Name </p>
          <p>Fees</p>
          <p>Action</p>
            
        </div>
        {
          appointments.map ((item, index)=>{
            {console.log(item);
            }
            return(
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr,3fr,1fr,3fr,3fr,1fr,1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index+1} </p>
              <div  className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userdata.image} alt="" />
                <p>{item.userdata.name}</p>
              </div>
              <p className='max-sm:hidden '>{calculateage(item.userdata.dob)}</p>
              <p>{slotdateformat(item.slotdate)}, {item.slottime}</p>
              <div  className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.docdata.image} alt="" />
                <p>{item.userdata.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {item.cancelled ? <p className='text-red-500 text-xs font-medium'>Cancelled</p> :
              item.iscomplited?<p className='text-green-500 text-xs font-medium'>Compited</p>
               :<img onClick={()=>cancleappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon } alt="" /> }
             
            </div>  
            )
          })
        }
      </div>
        </div>
  )
}
export default Allappointment
