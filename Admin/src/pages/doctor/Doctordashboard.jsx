import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext.jsx'
import { assets } from '../../assets/assets.js';
import { Appcontext } from '../../context/Appcontext.jsx';
const Doctordashboard = () => {
  const { dashdata, setdashdata, getdashdata, dtoken, cancleappointment,
    completappointment } = useContext(Doctorcontext);

  const { currency, slotdateformat } = useContext(Appcontext);

  useEffect(() => {
    if (dtoken) {
      getdashdata();


    }


  }, [dtoken])

  return dashdata && (
    <div className='m-5'>


      <div className='flex flex-wrap gap-3 '>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 '>{currency}
              {dashdata.earning}

            </p>
            <p className='text-gray-400'>Earnings </p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 '>
              {dashdata.appointments}

            </p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>
              {dashdata.patients}
            </p>

            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>

          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest booking </p>
        </div>
        <div className='top-4 border border-t-0'>
          {
            dashdata.latestappointments.map((item, index) => {
              return (
                <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>

                  <img className='rounded-full w-10' src={item.docdata.image} alt="" />
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{item.docdata.name}</p>
                    <p className='text-gray-800 '>{slotdateformat(item.slotdate)}</p>
                  </div>

                  {
                    item.cancelled ? <p className='text-red-400 text-xs font-medium'> Cancelled </p> : item.iscomplited ? <p className='text-green-500 text-xs font-medium'>Complited</p> :
                      <div className='flex'>
                        <img onClick={() => cancleappointment(item._id)} className='cursor-pointer' src={assets.cancel_icon} alt="" /><img onClick={() => completappointment(item._id)
                        } className='cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>

                  }

                </div>
              )

            })
          }
        </div>
      </div>



    </div>
  )
}

export default Doctordashboard
