import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContaxt.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Myprofile = () => {
  const { userdata, setuserdata, token, backendurl, loaduserprofiledata } = useContext(AppContext)
  const [isedit, setedit] = useState(false)
  const [image, setimage] = useState(false)

  const updateuserprofiledata = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", userdata.name);
      formdata.append("phone", userdata.phone);
      formdata.append("gender", userdata.gender);
      formdata.append("dob", userdata.dob);
      image && formdata.append("image", image);

      const { data } = await axios.post(backendurl + "/api/user/updateprofile", formdata, {
        headers: {
          token
        }
      });

      if (data.success) {
        toast.success(data.message);
        await loaduserprofiledata();
        setedit(false);
        setimage(false);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return userdata && (
    <div className='flex max-w-lg gap-2 text-sm flex-col'>
      {isedit ? (
        <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userdata.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden />
        </label>
      ) : (
        <img className='w-36 rounded' src={userdata.image} alt="" />
      )}

      {isedit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
          value={userdata.name}
          type="text"
          onChange={(e) => setuserdata(prev => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>
      )}
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id </p>
          <p className='text-blue-500'>{userdata.email}</p>
          <p className='font-medium'>Phone:</p>
          {isedit ? (
            <input
              className='bg-gray-100 max-w-52'
              value={userdata.phone}
              type="text"
              onChange={(e) => setuserdata(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userdata.phone}</p>
          )}
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isedit ? (
            <select
              className='max-w-20 bg-gray-100'
              onChange={(e) => setuserdata(prev => ({ ...prev, gender: e.target.value }))}
              value={userdata.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userdata.gender}</p>
          )}
          <p className='font-medium'>Birthday:</p>
          {isedit ? (
            <input
              className='max-w-28 bg-gray-100'
              type="date"
              value={userdata.dob}
              onChange={(e) => setuserdata(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className='text-gray-400'>{userdata.dob}</p>
          )}
        </div>
      </div>

      <div className='mt-10'>
        {isedit ? (
          <button
            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
            onClick={updateuserprofiledata}
          >
            Save Information
          </button>
        ) : (
          <button
            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
            onClick={() => setedit(true)}
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
}

export default Myprofile;
