import { createContext } from "react";
 export const Appcontext = createContext()
 const AppcontextProvider =(props)=>{
   const currency= "₹";
   const calculateage = (dob)=>{
      const today =new Date();
      const birthdate = new Date(dob);
      console.log(today.getFullYear(),birthdate.getFullYear());
      
      let age = today.getFullYear()-  birthdate.getFullYear();
      return age 
   }
   const months= ["","jan","feb","mar","apr","may","june", "jul","aug","sep","oct","nov", "dec"];
const slotdateformat =(slotdate)=>{
  const datearray= slotdate.split("-")
  return datearray[0]+" "+months[Number(datearray[1])] + " "+datearray[2];
}
    const value = { calculateage, slotdateformat,currency

    }
    return(
       < Appcontext.Provider value={value}>
       {
        props.children
       }
              </ Appcontext.Provider>

    )

 }
 export default AppcontextProvider