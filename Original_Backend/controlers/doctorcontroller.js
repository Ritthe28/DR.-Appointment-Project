// import doctormodel from "../models/doctormodel.js";
import doctormodel from "../models/doctormodel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentmodel from "../models/appointment.js";
// import e from "express";
// import { log } from "console";
// import doctormodel from "../models/doctormodel";
const changeavailability = async (req, res) => {
    try {
        const { docid } = req.body;
        const docData = await doctormodel.findById(docid);
        await doctormodel.findByIdAndUpdate(docid, { available: !docData.available })
        res.json({ success: true, message: "Availability Changed" })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
const doctorlist = async (req, res) => {
    try {
console.log("we are in the doctorlist");

        const doctors = await doctormodel.find({});

        // console.log(doctors,"doctors print hot aahe") 
        res.json({ success: true, doctors: doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

///Api for Doctor login 

const logindoctor = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const doctor = await doctormodel.findOne({ email })
    console.log(doctor, "doctor print hot aahe");

    if (!doctor) {
        return res.json({ success: false, message: "Invalid Credentials" })

    }
    const ismatch = await bcrypt.compare(password, doctor.password);


    if (ismatch) {
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    }
    else {
        return res.json({ success: false, message: "Invalid Credentials" })
    }

    try {

    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message })

    }

}

/////////Api toget appointments of the doctor/////////////

const appointsmentsdoctor = async (req, res) => {
    try {


        const { docid } = req.body;
        console.log(docid, "req.body print hot aahe");

        const appointments = await appointmentmodel.find({ docid });
        console.log(appointments, "appointments print hot aahe");
        res.json({ success: true, appointments });


    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message })

    }
}


/////api to mark appointment complete 

const appointmentcomplete = async (req, res) => {
    try {
        const { docid, appointmentid } = req.body;
        const appointmentdata = await appointmentmodel.findById(appointmentid);
        if (appointmentdata && appointmentdata.docid == docid) {
            await appointmentmodel.findByIdAndUpdate(appointmentid, { iscomplited: true })
            return res.json({ success: true, message: "appointment completed" });

        } else {
            return res.json({ success: false, message: "Invalid appointment id" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message })

    }
}



/////api to mark appointment cancle  

const appointmentcancle = async (req, res) => {
    try {
        const { docid, appointmentid } = req.body;
        const appointmentdata = await appointmentmodel.findById(appointmentid);
        if (appointmentdata && appointmentdata.docid == docid) {
            await appointmentmodel.findByIdAndUpdate(appointmentid, { cancelled: true })
            return res.json({ success: true, message: "appointment cancelled " });

        } else {
            return res.json({ success: false, message: "Invalid appointment id" })
        }


    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message })

    }
}


//////  Api to get the dashboard Data  ///////

const dooctordashboard = async (req, res) => {
    try {
        const { docid } = req.body;
        const appointments = await appointmentmodel.find({ docid });


        let earning = 0;
        appointments.map((item) => {
            if (item.iscomplited || item.paid) {
                earning += item.amount;
            }


        })
        let patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userid)) {
                patients.push(item.userid)
            }
        })

        const dashdata = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestappointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashdata });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

///Api to Get the doctor data for the profile page





const doctorprofile = async (req, res) => {
    try {
        const { docid } = req.body;
        const profiledata = await doctormodel.findById(docid);
        res.json({ success: true, profiledata })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }



}

/////////// Api to update Doctor data 

const updatedoctorprofile = async (req, res) => {
    try {
        console.log("inside the doctor update fuction");
        
        const { docid, fees, available, address } = req.body;
        await doctormodel.findByIdAndUpdate(docid, { fees, address, available })
        res.json({ success: true, message: "Profile Updated" });


    } catch (error) {
        console.log(error);
        req.json({ success: true, messge: error.message })

    }
}




export { changeavailability,
     doctorlist,
      logindoctor,
       appointsmentsdoctor, appointmentcancle, appointmentcomplete, dooctordashboard, doctorprofile, updatedoctorprofile }