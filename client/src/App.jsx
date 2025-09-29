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
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'
import Settings from './pages/dashboard/Settings'
import Dashboard from './pages/dashboard/Dashboard'
import AddProducts from './pages/dashboard/AddProducts'
import StoreInfo from './pages/dashboard/StoreInfo'
import Store from './pages/Store'
import Pricing from './pages/dashboard/Pricing'
import Subscriptions from './pages/dashboard/Subscriptions'

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
          <Route index element={<Dashboard />}/>
          <Route path='products' element={<Products />}/>
          <Route path='orders' element={<Orders />}/>
          <Route path='store-info' element={<StoreInfo />}/>
          <Route path='settings' element={<Settings />}/>
          <Route path='settings/subscribtions/' element={<Subscriptions />}/>
          <Route path='add-products' element={<AddProducts />}/>
          <Route path='pricing' element={<Pricing />} />
        </Route>
        <Route path='/store/:handle' element={<Store />} />
        <Route path='*' element={<div className='flex items-center justify-center h-100'>
          <div className='text-4xl'>
            <p>Ordorra Error 404</p>
            Page not found
          </div>
        </div>} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
