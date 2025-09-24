import React, { useContext } from 'react'
import "./index.css"
import Login from './pages/Login.jsx'
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify'
import { Appcontext } from './context/Appcontext.jsx'
import { Admincontext } from './context/Admincontext.jsx'
import Navbar from './component/Navbar.jsx'
import Sidebar from './component/Sidebar.jsx'
import {Routes, Route} from "react-router-dom"
import Dashbord from './pages/Admin/Dashbord.jsx'
import Allappointment from './pages/Admin/Allappointment.jsx'
import Adddoctor from './pages/Admin/Adddoctor.jsx'
import Doctorlist from './pages/Admin/Doctorlist.jsx'
import { Doctorcontext } from './context/Doctorcontext.jsx'
import Doctorappointment from './pages/doctor/Doctorappointment.jsx'
import Doctordashboard from './pages/doctor/Doctordashboard.jsx'
import Doctorprofile from './pages/doctor/Doctorprofile.jsx'
const App = () => {

  const {atoken} =useContext(Admincontext);
  const {dtoken}= useContext(Doctorcontext)

  return dtoken|| atoken? (
    <div className='bg-[#f8f9fD]'>

   
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>

          {/* Admin Routes */}
          <Route path='/' element={<></>} > </Route>
          <Route path='/admindashboard' element={<Dashbord />}></Route>
          <Route path='/allapointments' element={<Allappointment />}></Route>
          <Route path='/adddoctor' element={<Adddoctor />}></Route>
          <Route path='/doctorlist' element={<Doctorlist />}></Route>

          {/* doctor Route */}
          <Route path='/doctorappointment' element={<Doctorappointment />}></Route>
          <Route path='/doctordashboard' element={<Doctordashboard />}></Route>
          <Route path='/doctorprofile' element={<Doctorprofile />}></Route>

        </Routes>
      </div>
    
      
    </div>
  )  :(
    <div>

    <Login />
    <ToastContainer />
    </div>
  )
}

export default App
