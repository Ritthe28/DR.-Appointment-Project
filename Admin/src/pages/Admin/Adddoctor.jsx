import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Admincontext } from '../../context/Admincontext';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { json } from 'express';


const Adddoctor = () => {
  const [docimg, setdocimg ]=  useState(false);
  const [name , setname] = useState("");
  const [email, setemail]= useState("");
  const [password , setpassword] = useState("");
  const [experience, setexperience]= useState("");
  const [fees , setfees]= useState("");
  const [about , setabout ]= useState("");
  const [speciality, setspeciality]= useState("");
  const [degree, setdegree]= useState("");
  const [address, setaddress ] = useState("");
const {backendurl, atoken} = useContext(Admincontext);


  const onsubmithandler= async(event)=>{
 event.preventDefault();
 try{
  if (!docimg){
    return toast.error("Please Upload Doctor Image");

  }
  const formdata = new FormData ();
  formdata.append("image", docimg);
  formdata.append("name", name)
  formdata.append("email", email)
  formdata.append("password", password)
  formdata.append("experience",experience)
  formdata.append("fees", Number(fees))
  formdata.append("about", about)
  formdata.append("speciality", speciality)
  formdata.append("degree", degree)
  formdata.append( "address", JSON.stringify(address))
  //testing Weather dta is consoling properly 
// formdata.forEach((e)=>{
//   console.log(e)
// })
const {data} = await axios.post(backendurl+"/api/admin/add-doctor",formdata ,{headers:{
  atoken
}})

if(data.success){
  toast.success("Doctor Added Successfully ");
  setdocimg(false);
  setname("");
  setemail("");
  setpassword("");
  setexperience("");
  setfees("");
  setabout("");
  setspeciality("");
  setdegree("");
  setaddress("");
}

 }catch(error){
   console.log(error)
   toast.error(error.message)

  }}
  console.log ("hello world")

  return (
    <form action="" className='m-5 w-full' onSubmit={onsubmithandler}>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="docimg">
            <img src={docimg? URL.createObjectURL(docimg): assets.upload_area}  alt="" className='w-16 bg-gray-100 rounded-full cursor-pointer  '/>
          </label>
          <input type="file"  onChange={(e)=>setdocimg(e.target.files[0])} id='docimg' hidden />
          <p>Upload Doctor <br />picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name </p>
              <input onChange={(e)=>setname(e.target.value)} value={name} className='border rounded-none px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email </p>
              <input onChange={(e)=>setemail(e.target.value)} value={email} className='border rounded-none px-3 py-2' type="email" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'> 
              <p>Doctor Password </p>
              <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border rounded-none px-3 py-2' type="password" placeholder='password' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setexperience(e.target.value)}  value={experience} name="" id="" className='border rounded-none px-3 py-2'>
                <option value="1 Year"> 1 Year</option>
                <option value="2 Year"> 2 Year</option>
                <option value="3 Year"> 3 Year</option>
                <option value="4 Year"> 4 Year</option>
                <option value="5 Year"> 5 Year</option>
                <option value="6 Year"> 6 Year</option>
                <option value="7 Year"> 7 Year</option>
                <option value="8 Year"> 8 Year</option>
                <option value="9 Year"> 9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>fees</p>
              <input onChange={(e)=>setfees(e.target.value)} value={fees} className='border rounded-none px-3 py-2' type="number" placeholder='fees' required />
            </div>

          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciallity</p>
              <select className='border rounded-none px-3 py-2' onChange={(e)=>setspeciality(e.target.value)} value={speciality} name="" id="">
                <option value="General Solution ">General physician</option>
                <option value="Gyconologist"> Gyconologist</option>
                <option value="Dermotologist"> Dermotologist</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="Nuerologist"> Nuerologist </option>
                <option value="Gastrioenterologist">Gastrioenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=>setdegree(e.target.value)} value={degree} className='border rounded-none px-3 py-2' type="text" placeholder='education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address </p>
              <input onChange={(e)=>setaddress(e.target.value)} value={address} className='border rounded-none px-3 py-2' type="text" placeholder='Address' required />
              
            </div>
          </div>

        </div>
        <div>
          <p>About Doctor</p>
          <textarea onChange={(e)=>setabout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write About Doctor ' required rows={5}></textarea>

        </div>
        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
      </div>
    </form>
  )

}

export default Adddoctor
