/////-------------code for adding doctor------------------////////

import validator from "validator" 
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import { json } from "stream/consumers";
import doctormodel from "../models/doctormodel.js";
import jwt from "jsonwebtoken"
import appointmentmodel from "../models/appointment.js";
import usermodel from "../models/usermodel.js";



const adddoctor = async(req,res)=>{


    console.log("hiii I am in the add doctor ")
    try{
        const {name,email, password , speciality , degree , experience , about , fees , address}=req.body ;
        console.log(req.body);
        // const imagefile = req.file 
//  checking All data to doctor 
if (!name || !email || !password||!speciality || !degree || !experience  || !about || !fees || !address){
    return res.json ({success : false , message :"missing details "})
}
console.log({name,email, password , speciality , degree , experience , about , fees , address})




//validating  email format
 if (!validator.isEmail(email)){
    return res.json ({success : false , message :"please Enter Valid Email"})
 }


 ////////////// Validating Strong Password ///////////////////////
 if (password.length<8){
    return res.json ({success : false , message :"please enter a strong password "})
 }


 ////////// hashing docvtor password ////////////////////


 const salt  = await bcrypt.genSalt(10)
 const hashpassword = await bcrypt.hash(password,salt)


 //uploading image to clodnary 


//  const imageupload = await cloudinary.uploader.upload(imagefile.path,  {resource_type:"image"})
//  const imageurl = imageupload.secure_url


 const doctordata = {
    name,
    email,
password:hashpassword,
    speciality,
    experience,
    about ,
    fees,
    address: JSON.parse(address),
    date : Date.now()

 }
 console.log(   name,
    email,
password,
    speciality,
    experience,
    about ,
    fees,
    address
 )

const newdoctor = new doctormodel(doctordata)
await newdoctor.save();
console.log(newdoctor,"new doctor data print hot aahe")
res.json ({success:true , message :"Doctor Added"})


    }catch(error){
        console.log (error)
        res.json({success:false , message: error.message})

    }
}
////////////////////////////////////   API for adminn login ////////////////////////////////////////

const loginadmin = async (req,res)=>{
   try {

const {email,password }= req.body    ;
// console.log ( {email,password })
if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){

const token = jwt.sign(email+password, process.env.JWT_SECRET)
res.json({success:true, token})
}else {
    res.json({success:false , message:"Invalid Credentials"})
   
}

   }catch (error){
    console.log(error)
    res.json({success:false, message:error.message})
   }


}

// ApI to get All Doctor list for admin pannel 
const alldoctors = async(req,res)=>{
    try{
           const doctors = await doctormodel.find({}).select('-password');
        //    console.log(doctors)
           res.json({success:true, doctors:     doctors})
    }catch (e){

    }
}
const appointmentsadmin = async (req,res)=>{
try{
    const appointments = await appointmentmodel.find({});
    res.json({success:true, appointments});

}catch (error ){
    console.log(error);
    res.json({success:false, message:error.message});
     
    
}

}


///////////Api for appointment xcancle by thr user 

const admincancle =  async (req,res)=>{
    console.log("cancle appointmet madhe aaher sadhya");
    
try{
    const { appointmentid}= req.body;
    // console.log("logging appointmentid");
    // console.log(appointmentid);
    
    

    const appointmentdata = await appointmentmodel.findById(appointmentid);
    ////verify appointment user \
    // console.log(appointmentdata,"data data");
    


 await appointmentmodel.findByIdAndUpdate(appointmentid,{cancelled:true})

 ///releasing doctor slot 
 const {docid , slotdate, slottime}= appointmentdata;
 const doctordata = await doctormodel.findById(docid);
 let slotsbooked = doctordata.slots_booked;
 slotsbooked[slotdate] = slotsbooked[slotdate].filter(e=> e!==slottime);
 await doctormodel.findByIdAndUpdate(docid,{slots_booked:slotsbooked});

res.json({success:true, message:"Appointment ancelled"})

}catch (error){
    console.log (error);
    res.json({success:true, message:error.message});

}
}

/// Api to get the dashboard data 

const  admindashboard = async (req,res)=>{
    try{
        const doctors = await doctormodel.find({});
        const users = await usermodel.find({});
        const appointments = await appointmentmodel.find({});
        const dashdata = {
            doctors : doctors.length,
            appointments : appointments.length,
            patients : users.length,
            latestappointments : appointments.reverse().slice(0,5)
        }
res.json({success:true, dashdata})  

    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
    }
}



const doctorlist =async (req,res)=>{
        try{
            const doctors = await doctormodel.find({});

            // console.log(doctors,"doctors print hot aahe") 
            res.json({success:true, doctors:     doctors})
     }catch (error){
        console.log(error)
        res.json({success:false, message:error.message})       

     }
    }




export  {adddoctor, loginadmin , alldoctors, appointmentsadmin, admincancle,admindashboard,doctorlist}