import bcrypt from 'bcrypt';
import validator from 'validator';
import usermodel from '../models/usermodel.js';
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import doctormodel from '../models/doctormodel.js';
import appointmentmodel from '../models/appointment.js';
import razorpay from "razorpay"

const registeruser = async (req, res) => {
    console.log("I am in the register user");
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        // Check if email already exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already exists" });
        }

        // Validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const usedata = {
            name,
            email,
            password: hashpassword
        };

        const newuser = new usermodel(usedata);
        const user = await newuser.save();

        // Generating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token });

    } catch (error) {
          console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api for user login

const loginuser = async (req, res) => {
try{
    console.log ("in the login user")
    const {email, password}= req.body;
    const user = await usermodel.findOne({email});
    if (!user){
        return res.json({success:false, message:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch){
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        // localStorage.setItem("token", token);
        res.json({success:true, token});
    }
    else {
        res.json({success:false, message:"Invalid Credentials"});
    }
}
catch(e){

}
    
}

//// Api to get user profile data 
const getprofile = async(req,res)=>{
    console.log("in the profile", );
    console.log(req.body);
    
    
    try{

        const {userid }= req.body ;
        console.log(userid);
        
        const userdata= await usermodel.findById(userid).select("-password");
        // const userdata = await usermodel.find();

        console.log(userdata, "uderdsts logging ");
        
        res.json ({success:true, userdata});




    }catch(e) {
        console.log(e);
        res.json({success:false, message :e.message })

    }

}


// Api to update user profile 


const updateprofile  = async(req, res )=>{
    console.log (req.body)

    try {
        const {userid , name ,phone , dob, gender}= req.body;
        
        console.log(userid , name ,phone , dob, gender);
        
        const imagefile = req.file;
        console.log()
        if (!userid || !name ||!phone || !dob|| !gender){
             res.json ({success:false, message :"Data Missing"})
        }
        await usermodel.findByIdAndUpdate(userid, {name, phone ,dob,gender});
        if (imagefile){
            const imagepath = imagefile.path;
            const result = await cloudinary.uploader.upload(imagefile.path,{resource_type:"auto"});
            const imgurl =result.secure_url;
            await usermodel.findByIdAndUpdate(userid, {image:imgurl});
    } 
    res.json({success:true, message:"Profile Updated"})
}
    catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    


}


// Api to book Appointment 
const bookappointment = async (req, res) => {
    try {
        const { userid, docid, slotdate, slottime, userdata } = req.body;

        // Fetch doctor details
        const doctor = await doctormodel.findById(docid);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Ensure doctor is available
        if (!doctor.available) {
            return res.status(400).json({ success: false, message: "Doctor not available" });
        }

        // Initialize slots_booked if not present
        if (!doctor.slots_booked) {
            doctor.slots_booked = {};
        }

        // Initialize slotdate entry if not present
        if (!doctor.slots_booked[slotdate]) {
            doctor.slots_booked[slotdate] = [];
        }

        // Check if slot is already booked
        if (doctor.slots_booked[slotdate].includes(slottime)) {
            return res.status(400).json({ success: false, message: "Slot not available" });
        }

        // Add the slot to booked slots
        doctor.slots_booked[slotdate].push(slottime);
        doctor.markModified("slots_booked"); // Ensure Mongoose detects the change
        await doctor.save();

        // Create appointment record
        const appointment = new appointmentmodel({
            userid,
            docid,
            slotdate,
            slottime,
            userdata,
            date: Date.now(),
            amount: doctor.fees,
            status: "Booked",
            docdata: doctor // You can directly store doctor data
        });

        await appointment.save();

        res.json({ success: true, message: "Appointment booked successfully" });

    } catch (error) {
        console.error("Error Booking Appointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// API to get APointement 

const listappointment =async(req,res)=>{
    try{
        const {userid}= req.body;
        const appointments = await appointmentmodel.find({userid});
        res.json({success:true, appointments})


    }catch(error){
        console.log (error);
        res.json({success:false, message: error.message})

    }
}

//Api to Appointment 


const cancleappointment =  async (req,res)=>{
    console.log("cancle appointmet madhe aaher sadhya");
    
try{
    const {userid,appointmentid}= req.body;
    // console.log("logging appointmentid");
    // console.log(appointmentid);
    
    

    const appointmentdata = await appointmentmodel.findById(appointmentid);
    ////verify appointment user \
    // console.log(appointmentdata,"data data");
    

    if (appointmentdata.userid !==userid){

        return res.json({success:false,  message:"unauthorized Action"})

    }

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

///
const razorpayinstaance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRETE_KEY
});
const paymentrazorpay=async(req,res)=>{

    try{

        
        
        const {appointmentid}= req.body;
        const appointmentdata = await appointmentmodel.findById(appointmentid);
        
        if (!appointmentdata || appointmentdata.cancelled ){
           return res.json({success:false, message :"Appointment Cancelled or not found"})
            
        }
        
        //////  Create options for razorpay payments 
        const options = {
            amount :appointmentdata.amount*100,
            currency : process.env.CURRENCY,
            receipt : appointmentid
        }
        
        //////      Creation of an Order 
        const order = await razorpayinstaance.orders.create(options);
        
        
        res.json ({
            success :true,
            order
        })
        
    }catch(error){
        console.log(error);

        

    }
}

// Api to Varify the payments of the customer 
const varifyrazorpay = async (req,res )=>{
    try {
        const { responce,appointmentid}= req.body;
        console.log(responce.razorpay_order_id,"  Appointment Id ", appointmentid, "in the varify");
        
        const  orderinfo =  await razorpayinstaance.orders.fetch(responce.razorpay_order_id);
         if (orderinfo.status==='paid'){
            console.log(orderinfo.receipt);
            
        //   const data =  await appointmentmodel.findById(orderinfo.receipt)
        //   console.log(data, "receipt");
          
  
          
            await appointmentmodel.findByIdAndUpdate(orderinfo.receipt,{paid :true});
            res.json({success:true, message:"Payment successful"})
         }else {
            res.json({success:false, message:"Payment failed"})
         }
    }catch (error){

    }
} 


export { registeruser , loginuser ,getprofile, updateprofile , bookappointment, listappointment,cancleappointment, paymentrazorpay, varifyrazorpay
};
