import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext.jsx';
import { AppContext } from '../context/AppContaxt.jsx';
import { assets } from '../../assets/assets_frontend/assets';
import Relateddoctors from '../Components/Relateddoctors.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docid } = useParams();
  const navigate = useNavigate();
  const { doctors, currencysymbol, getdoctosdata, token, backendurl,userdata } = useContext(AppContext);
  const daysofweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [docinfo, setdocinfo] = useState(null);
  const [docslot, setdocslot] = useState([]);
  const [slotindex, setslotindex] = useState(0);
  const [slottime, setslottime] = useState('');

  useEffect(() => {
    if (doctors && docid) {
      setdocinfo(doctors.find(doc => doc._id === docid));
    }
  }, [docid, doctors]);

  useEffect(() => {
    if (docinfo) getavailableslots();
  }, [docinfo]);

  const getavailableslots = () => {
    let today = new Date();
    let newDocSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);
      let endtime = new Date(currentdate);
      endtime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentdate.setHours(Math.max(currentdate.getHours() + 1, 10));
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentdate.setHours(10, 0, 0, 0);
      }

      let timeslots = [];
      while (currentdate < endtime) {
        let day =currentdate.getDate();
        let month = currentdate.getMonth();
        let year = currentdate.getFullYear();
        const slotdate = day+"_"+month+"_"+year;


        timeslots.push({ datetime: new Date(currentdate), time: currentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }

      if (timeslots.length > 0) newDocSlots.push(timeslots);
    }

    setdocslot(newDocSlots);
  };

  const bookappointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }

    if (!docslot.length || !docslot[slotindex]?.length || !slottime) {
      toast.error("Please select a valid slot date and time!");
      return;
    }

    try {
      const date = docslot[slotindex][0].datetime;
      const slotdate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const { data } = await axios.post(
        `${backendurl}/api/user/bookappointment`,
        { docid, slotdate, slottime,userdata },
        { headers: { token } }
      );
console.log (docid, slotdate, slottime)
      if (data.success) {
        toast.success(data.message);
        getdoctosdata();
        navigate("/myappointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return docinfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docinfo.image} alt="Doctor" />
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docinfo.name}
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree} - {docinfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docinfo.experience}
            </button>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencysymbol}{docinfo.fees}</span>
          </p>
        </div>
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docslot.map((item, index) => (
            <div onClick={() => setslotindex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
              <p>{daysofweek[item[0]?.datetime.getDay()]}</p>
              <p>{item[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docslot[slotindex]?.map((item, index) => (
            <p onClick={() => setslottime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookappointment}>Book An Appointment</button>
      </div>
      <Relateddoctors docid={docid} speciality={docinfo.speciality} />
    </div>
  );
};

export default Appointment;
