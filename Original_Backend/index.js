import express from "express"

import connectdb from "./config/mongodb.js";
import connectcloudinary from "./config/cloudnary.js";
import adminrouter from "./routes/adminroute.js";
import cors from "cors";
import "dotenv/config";
import doctorrouter from "./routes/doctorroute.js";
import userrouter from "./routes/userroutes.js";
import upload from "./middleware/multer.js";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
app.use(cors())
app.use (express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req,res)=>{
    console.log ("hgdshdshdgsgdhsgdgsh")
    res.send("mmmhhhh run tar hotay ")
    
})

app.get ("/get", (req,res)=>{
    res.send ("okk lets test the get requiest")
})

app.use("/api/admin", adminrouter);
app.use("/api/doctor", doctorrouter);
app.use("/api/user", userrouter);

app.get("/",(req,res)=>{
    console.log("backend RUnning ");
    
})

connectdb();
connectcloudinary();

app.listen(4000, ()=>{
    console.log("listening 4000")
    // console.log ("ohhhh ho ganja ganja ")
    // console.log("what should i do ")
})

