import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContaxt';


const Doctors = () => {
  const navigate = useNavigate();
const [showfilter, setshowfilter]= useState(false)
  const { speciality } = useParams();
  const [filterdoc, setfilterdoc] = useState([])
  console.log(speciality);
  const { doctors } = useContext(AppContext);
  const applyfilter = () => {
    if (speciality) {
      setfilterdoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setfilterdoc(doctors);

    }
  }


  useEffect(() => {
    applyfilter()

  }, [doctors, speciality])


  return (
    <div>
      <p className='text-gray-600 '> Browse Through the doctors speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border  rounded  text-sm transition-all sm:hidden ${showfilter?"bg-primary text-white":""}`} onClick={()=>setshowfilter(prev=>!prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showfilter?"flex":"hidden sm:flex"}`}>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'General physician'}`)}>General Physicial</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'Gynecologist'}`)}>Gynecologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'Dermatologist'}`)}>dermatologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'Neurologist'}`)}>Nurologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'Gastroenterologist'}`)}>Gastroenterologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1 pr-16  border bg-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black" : ""}`} onClick={() => navigate(`/doctors/${'Pediatricians'}`)}>Pediatricuas</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>

          {
            filterdoc.map((item, index) => {
              return (
                <div onClick={() => navigate(`/appointments/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-100'>
                  <img src={item.image} alt="" />
                  <div className='p-4'>
                  <div className={`flex items-center  gap-2 text-sm text-center${item.available?"bg-green-500":"bg-gray-500"} `}>
                                    <p className={`w-2 h-2 ${item.available?' bg-green-500 ':"bg-gray-500"}rounded-full`}></p><p>{item.available?"Available":"Not Available "}</p>
                                </div>
                    <p>{item.name}</p>
                    <p>{item.speciality}</p>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>

    </div>
  )
}

export default Doctors
