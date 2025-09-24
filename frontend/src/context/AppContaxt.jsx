import { createContext, useEffect, useState } from "react";
// import { doctors } from "../../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext= createContext()

const AppContextProvider= (props)=>{
    const currencysymbol ='$'
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setdoctors] =useState([]);
    const[token, settoken]= useState(localStorage.getItem("token")?localStorage.getItem("token"):false);
    const [userdata , setuserdata]= useState(false)

  
    const getdoctosdata= async()=>{
    try{
        const {data} = await axios.get(`${backendurl}/api/doctor/list`)
             console.log("these are doctors",data);
             
        if (data.success){
            setdoctors(data.doctors)
        }else{
            toast.error(data.message)
        }
    }catch(error){
        console.log(error)  ;
        toast.error(error.message)
    
    }}
 
const loaduserprofiledata = async()=>{
    try {
    const{data}= await axios.get(backendurl+"/api/user/getprofile",{
        headers:{
            token
        }
    })
    console.log("this is user data ", data);
    

    if (data.success){
        setuserdata(data.userdata)
    }else {
        toast.error(data.message )
    }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }

}
    useEffect(()=>{
getdoctosdata()
    },[])
useEffect(() => {
  if(token){
    loaduserprofiledata()
  }else{
    setuserdata(false);
  }


}, [token])
const value= {
    doctors,currencysymbol, backendurl,token, settoken, userdata,setuserdata,loaduserprofiledata, getdoctosdata
}
    
    return(

        <AppContext.Provider value={value}>
{
    props.children
}
       </AppContext.Provider>
    )
}
export default AppContextProvider