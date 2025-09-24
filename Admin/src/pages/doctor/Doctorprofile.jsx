import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext,  } from '../../context/Doctorcontext.jsx'
import { Appcontext } from '../../context/Appcontext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
const Doctorprofile = () => {
  const {dtoken ,getprofiledata, profiledata, setprofiledata,backendurl} =useContext(Doctorcontext);
  const {currency  }=useContext(Appcontext);
  const [isedit , setisedit ]=useState(false);

const updateprofile = async ()=>{
  try {
    const updatedata = {
      address:profiledata.address,
      fees:profiledata.fees,
      available:profiledata.available

    }
    const {data }= await axios.post(backendurl+"/api/doctor/updateprofile",updatedata,{headers:{dtoken}})

    if (data.success){
      toast.success(data.message ||"Profile updated successfully");
      setisedit(false);
      getprofiledata();

    }
    else {
      toast.error(data.message ||"Error in updating profile");

    }

  }catch (error){
toast.error(error.message )
console.log(error);

  }
}


  useEffect(()=>{
if (dtoken){
  getprofiledata()
}
  },[dtoken])

  return profiledata && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg" ' src={profiledata.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
{/* docinfo : name , degree , experience  */}
<p className='flex items-center gap-2 text-3xl font-medium text-gray-700   '>{profiledata.name}</p>
<div>

<p className='flex items-center gap-2 mt-1 text-gray-600'>
  Mbbs - {profiledata.speciality}

</p>
<button className='py-0.5 px-2 border text-xs rounded-full'>{profiledata.experience}</button>
</div>
{/* 
     Doctors About  */}
     <div>
      <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 '>
        About :
      </p>
      <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profiledata.about }</p>

     </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-800 '>{currency}{ isedit? <input onChange={(e)=>setprofiledata(prev=>({...prev,fees:e.target.value}))} value={profiledata.fees }  type="number" />   : profiledata.fees}</span>
          </p>
          <div className='flex gap-2 py-2'>
            <p className='text-sm'>
              Address:
            </p>
            <p>{ isedit? <input onChange={(e)=>setprofiledata(prev=>({...prev,address:e.target.value}))} value={profiledata.address} type="text" />   :   profiledata.address}</p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={(e)=>isedit&& setprofiledata(pre=>({...pre, available:!pre.available}))} checked= {profiledata.available} type="checkbox" />
            <label htmlFor="">Available </label>
          </div>
        {isedit?  <button onClick={()=>{
           updateprofile()
          }} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all '>Save</button>
          :<button onClick={()=>{
            setisedit(true)
          }} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all '>Edit</button>}

        </div>
      </div>
   
    </div>
  )
}

export default Doctorprofile
