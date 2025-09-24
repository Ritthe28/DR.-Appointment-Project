import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContaxt.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendurl, token, settoken } = useContext(AppContext)
  const [state, setstate] = useState('Sign Up')
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  
const [name, setname] = useState("");


const onsubmithandler = async (event) => {
    event.preventDefault()
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/user/register", { name, email, password })
        if (data.success) {
          localStorage.setItem("token", data.token)
          settoken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/login", { email, password })
        if (data.success) {
          localStorage.setItem("token", data.token)
          settoken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (e) {
      toast.error(e.message)
    }

  }
  useEffect(()=>{
    if (token){
       navigate("/")
    }

  },[token])
  return (
    <form className='minh-[80vh] flex items-center' onSubmit={onsubmithandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "create Account" : "login"}</p>
        <p> please {state === 'Sign Up' ? "Sign up " : "log in"} to book Appointment </p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>
              Full Name
            </p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => {
              setname(e.target.value)

            }}value={name} required />
          </div>
        }

        <div className='w-full'>
          <p>
            Email        </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => {
            setemail(e.target.value)

          }} value={email} required />
        </div>
        <div className='w-full'>
          <p>
            Password        </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => {
            setpassword(e.target.value)

          }} value={password} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "create Account" : "login"}</button>
        {state === "Sign Up" ? <p>Already have an accound ? <span onClick={() => setstate("Login")} className='text-primary underline cursor-pointer'>login here</span></p> : <p>Create a new Account ? <span onClick={() => setstate("Sign Up")} className='text-primary underline cursor-pointer'>click here</span></p>}
      </div>
    </form>
  )
}

export default Login
