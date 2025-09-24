import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappointments from './pages/Myappointments'
import About from "./pages/About"
import Appointment from './pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <  Route path='/myprofile' element={<Myprofile />} />
        <Route path='/appointments/:docid' element={<Appointment />} />
        <  Route path='/myappointments' element={<Myappointments />} />
      </Routes>
<Footer/>
    </div>
  )
}

export default App
