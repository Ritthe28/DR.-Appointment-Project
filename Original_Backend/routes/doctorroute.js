import express from "express";
import { appointsmentsdoctor, doctorlist, logindoctor, appointmentcancle,appointmentcomplete,dooctordashboard, doctorprofile, updatedoctorprofile } from "../controlers/doctorcontroller.js";

import { alldoctors } from "../controlers/admincontroller.js";
import authdoctor from "../middleware/auth_doctor.js";



const doctorrouter = express.Router();

doctorrouter.get("/list",doctorlist)
doctorrouter.post ("/login",logindoctor);
doctorrouter.get("/appointments",authdoctor,appointsmentsdoctor)
doctorrouter.post("/cancleappointment",authdoctor,appointmentcancle)
doctorrouter.post("/completeappointment",authdoctor,appointmentcomplete)
doctorrouter.get("/doctordashboard",authdoctor,dooctordashboard);

doctorrouter.get ("/profile",authdoctor,doctorprofile);
doctorrouter.post("/updateprofile", authdoctor, updatedoctorprofile)

 
export default doctorrouter;

