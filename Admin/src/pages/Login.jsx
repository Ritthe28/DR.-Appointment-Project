import { assets } from "../assets/assets.js";
import React, { useContext, useState } from 'react'
import { Admincontext } from "../context/Admincontext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { Doctorcontext } from "../context/Doctorcontext.jsx";

const Login = () => {
    const [state, setstate] = useState("Admin");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { setatoken, backendurl } = useContext(Admincontext);
    const{setdtoken} = useContext(Doctorcontext)

    const onsubmithandler = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (state === "Admin") {
                response = await axios.post(`${backendurl}/api/admin/login`, { email, password });

                const { data } = response;
                if (data.success) {
                    localStorage.setItem('atoken', data.token);
                    setatoken(data.token);
                    console.log(data.token);
                    toast.success("Login successful!");
                } else {
                    toast.error(data.message || "Login failed");
                    console.log(data.message);
                }


            } else {
                response = await axios.post(`${backendurl}/api/doctor/login`, { email, password });
                const { data } = response;
                if (data.success) {
                    localStorage.setItem('dtoken', data.token);
                    setdtoken(data.token);
                    console.log(data.token);
                    toast.success("Login successful!");
                } else {
                    toast.error(data.message || "Login failed");
                    console.log(data.message);
                } 




            }
          
            
           
        } catch (e) {
            toast.error("An error occurred. Please try again.");
            console.error(e);
        }
    };



    
    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={onsubmithandler}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary ">{state}</span> Login
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setemail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setpassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
                {state === "Admin" ? (
                    <p>Doctor Login <span className="text-primary underline cursor-pointer" onClick={() => setstate("Doctor")}>Click here</span></p>
                ) : (
                    <p>Admin Login <span className="text-primary underline cursor-pointer" onClick={() => setstate("Admin")}>click here</span></p>
                )}
            </div>
        </form>
    );
};

export default Login;
