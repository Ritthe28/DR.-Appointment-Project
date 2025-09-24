import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
 export const Admincontext = createContext()
 const AdmincontextProvider =(props)=>{
    const [atoken, setatoken]=useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"")

       const backendurl = import.meta.env.VITE_BACKEND_URL;
       const [doctors   , setdoctors]= useState([])
    
   const [appointments, setappointments]= useState([]);
   const [dashdata, setdashdata]= useState(false );


    const getalldoctors = async(appointmentid)=>{
         try{
               const {data} = await axios.post(backendurl+"/api/admin/doctorlist",{},{
                  headers:{
                     atoken
                  }
               })
               console.log(data);
               
               console.log(data)
               if (data.success){
                  setdoctors(data.doctors)
                  console.log(data.doctors);
               }else{
                  toast.error(data.message)

               }
               console.log(data)
         }catch(error){
            toast.error(error.message)
         }
      }
      const chageavailability =async(docid)=>{
         try
         {
     const {data} =await axios.post(backendurl+"/api/admin/change-availability",{docid},{
       headers:{   atoken
       }}) 
       if (data.success){
         toast.success(data.message)
         getalldoctors()
       }else {
     
         toast.error(data.message)
       }
         }catch(e){
     
         }
     
       }
       
 const getallappointments = async ()=>{
   try {
const {data} = await axios.get(backendurl+"/api/admin/appointments",{headers:{
   atoken
}})
// console.log(data);
 
if (data.success){
   setappointments(data.appointments);
       
}
   }catch (error){
      console.log(error);
      toast.error(error.message); 

   }
 }




const cancleappointment = async (appointmentid)=>{

try {
   const {data}= await axios.post(backendurl+"/api/admin/cancleappointment", {appointmentid}, {headers:{
      atoken
   }})
   if (data.success){
      toast.success(data.message);
      getallappointments();
   }
}catch(error){
   console.log(error);
   toast.error(error.message);

   
}


}

const getdashdata = async ()=>{
   try{
      const {data }= await axios.get (backendurl+"/api/admin/dashboard", {headers:{
         atoken
      }} )
      if (data.success){
          setdashdata(data.dashdata)
          console.log(data.dashdata);
         
      }
      else {
         toast.error(data.message )
      }
   }catch (error ){
      toast.error(error.message);
      console.log(error);
      
   }
}

      const value = {
         atoken , setatoken,backendurl,doctors,getalldoctors,chageavailability, appointments, setappointments,getallappointments, cancleappointment, getdashdata,dashdata
 
     }
    return(
       < Admincontext.Provider value={value}>

       {
        props.children
       }
              </ Admincontext.Provider>

    )

 }
 export default AdmincontextProvider