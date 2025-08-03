import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LNavbar from './components/LNavbar'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import VerifyEmail from './pages/VerifyEmail'
import DashboardLayout from './components/DashboardLayout'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify'
import Index from './pages/dashboard'
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'
import Settings from './pages/dashboard/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LNavbar />} >
          <Route index element={<LandingPage />}/>
          <Route path='signup' element={<Signup />}/>
          <Route path='signin' element={<Signin />}/>
          <Route path='verify-email' element={<VerifyEmail />}/>
          <Route path='reset-password' element={<ResetPassword />}/>
          <Route path='forgot-password' element={<ForgotPassword />}/>
        </Route>

        <Route path='dashboard' element={<DashboardLayout />}>
          <Route index element={<Index />}/>
          <Route path='products' element={<Products />}/>
          <Route path='orders' element={<Orders />}/>
          <Route path='settings' element={<Settings />}/>
        </Route>

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
