import   express from "express"
import  {adddoctor, alldoctors, appointmentsadmin , admincancle, admindashboard}  from "../controlers/admincontroller.js"
import { loginadmin } from "../controlers/admincontroller.js";
import authadmin from "../middleware/auth_admin.js";
import upload from "../middleware/multer.js"
import { changeavailability } from "../controlers/doctorcontroller.js";
import { doctorlist } from "../controlers/admincontroller.js";

const  adminrouter = express.Router();

adminrouter.post("/add-doctor",authadmin  ,upload.single("image"),  adddoctor)
adminrouter.post("/login",  loginadmin)
adminrouter.post("/all-doctors", authadmin,  alldoctors)
adminrouter.post("/change-availability", authadmin,  changeavailability);
adminrouter.get("/appointments", authadmin, appointmentsadmin )
adminrouter.post("/cancleappointment", authadmin, admincancle )
adminrouter.post("/doctorlist", authadmin,doctorlist )
adminrouter.get ("/dashboard",authadmin, admindashboard)

export default adminrouter;