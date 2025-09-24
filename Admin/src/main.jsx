import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdmincontextProvider from './context/Admincontext.jsx'
import Doctorcontextprovider from './context/Doctorcontext.jsx'
import AppcontextProvider from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AdmincontextProvider>
      <Doctorcontextprovider>
        <AppcontextProvider>
          <App />
        </AppcontextProvider>
      </ Doctorcontextprovider>
    </AdmincontextProvider>
  </BrowserRouter>,
)
