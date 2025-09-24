import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
 export const Doctorcontext = createContext()
 const Doctorcontextprovider =(props)=>{
  let refresh =0;
     const backendurl =  import.meta.env.VITE_BACKEND_URL;
     const [dtoken, setdtoken]= useState(localStorage.getItem("dtoken")?localStorage.getItem("dtoken"):"");
     const [appointments , setappointments] = useState([]);
     const [dashdata, setdashdata]= useState(false );
     const [profiledata ,setprofiledata]=useState(false)
     const getappointments= async ()=>{
      try {
const {data}= await axios.get(backendurl+"/api/doctor/appointments", {headers:{
   dtoken
}})
// console.log(data);
if (data.success){
   setappointments(data.appointments)
   console.log(data.appointments.reverse());
   
}else {
   toast.error(data.message ||"Error in fetching appointments")
}
      }catch (e)
      {
         console.log(e);
         toast.error(e.message ||"Error in fetching appointments");
         

      }
     }


     const completappointment =async(appointmentid)=>{
       try {
  const {data} = await axios.post(backendurl+"/api/doctor/completeappointment", {appointmentid},{headers:{
   dtoken
  }})
if (data.success){
   toast.success(data.message )
   getappointments();

}else {
   toast.error(data.message );
}


       }catch(error){
         toast.error(error.message ||"Error in completing appointment")
         console.log(error);
         
       }


     }


     //////function to cancleappointment 


     const cancleappointment =async(appointmentid)=>{
      try {
 const {data} = await axios.post(backendurl+"/api/doctor/cancleappointment", {appointmentid},{headers:{
  dtoken
 }})
if (data.success){
  toast.success(data.message )
  getappointments();

}else {
  toast.error(data.message );
}


      }catch(error){
        toast.error(error.message ||"Error in cancelling appointment")
        console.log(error);
        
      }


    }


const getdashdata = async ()=>{
  try {
    const {data} = await  axios.get(backendurl+"/api/doctor/doctordashboard", {headers:{
      dtoken
    }})
if (data.success){
  setdashdata(data.dashdata)
  console.log(data.dashdata);
}
else {
  toast.error(data.message );
}

  }catch (error ){
    console.log(error);
    toast.error(error.message ||"Error in fetching dashboard data")
  }
}

const getprofiledata = async()=>{
  try {
    const {data }=await axios.get (backendurl+"/api/doctor/profile",{headers:{dtoken}} )
    if (data.success ){
      setprofiledata(data.profiledata);
      console.log("inside the getprofiledtaa ");
      
      console.log(data.profiledata);
      
    }

  }catch(error){
    console.log(error);
    toast.error(error.message)
    
  }
}
    

    const value = {backendurl, dtoken, setdtoken,  getappointments,appointments, setappointments,
      cancleappointment, completappointment, getdashdata, dashdata, setdashdata,getprofiledata, profiledata, setprofiledata

    }
    return(
       < Doctorcontext.Provider value={value}>

       {
        props.children
       }
              </ Doctorcontext.Provider>

    )

 }
 export default Doctorcontextprovider