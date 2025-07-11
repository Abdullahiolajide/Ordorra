import React from 'react'
import { myToast } from './myToast'
import { toast } from 'react-toastify'

const DashboardLayout = () => {
  return (
    <div>DashboardLayout
      <button onClick={()=> myToast(
        <div className='text-center w-full max-w-xl'>
          <h1 className='text-xl font-md'>Sign Up Successful</h1>
          <p>A verification code has been sent to your email. Please enter it to complete your registration.</p>
          <button className='mt-2 p-2 bg-green-700 text-white rounded mx-auto' onClick={()=> toast.dismiss()}>close</button>
        </div>
    )}>show Toast</button>
    </div>
  )
}

export default DashboardLayout