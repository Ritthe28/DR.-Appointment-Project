import express from 'express';
import { registeruser,loginuser, getprofile,updateprofile,bookappointment,listappointment, cancleappointment ,paymentrazorpay, varifyrazorpay } from '../controlers/usercontroller.js';
import authuser from '../middleware/auth_user.js';
import upload from '../middleware/multer.js';
import multer from 'multer';
const userrouter = express.Router();
userrouter.post("/register", registeruser);
userrouter.post("/login",loginuser);
userrouter.post("/updateprofile",upload.single("image"),authuser, updateprofile);
userrouter.get("/getprofile",upload.single("image") ,authuser, getprofile);
userrouter.post("/bookappointment", authuser, bookappointment);
userrouter.get("/appointments",authuser, listappointment);
userrouter.post("/cancleappointment", authuser,cancleappointment)
userrouter.post("/paymentrazorpay",authuser,paymentrazorpay);

userrouter.post("/varifyrazorpay",authuser,varifyrazorpay)


export default userrouter;