import React, { useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { backendurl } from '../../global'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const verifyEmail = () => {
    const [otp, setOtp] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const verifyEmail = async () => {
        const email = localStorage.getItem('ouseremail')
        console.log(otp, email)
        

        try {
            setLoading(true);

            const res = await axios.post(`${backendurl}/auth/verify-code`, {
                email,
                code:otp
            });
            setMessage('success')
            console.log(res.data);
            navigate('/signin')
            // or show toast

        } catch (err) {
            console.log(err)
            // better error handling
            if (err.response) {
            setMessage(err.response.data.message || 'Something went wrong');
            } else {
            setMessage('Network error');
            }
        } finally {
            setLoading(false);
        }
    };
  return (
    <div>
        <section className='h-[90vh] flex mt-20 justify-center'>
            <div className='h-fit shadow-md p-4 md:w-full w-11/12 md:max-w-xl'>
                <div className='text-4xl flex justify-center'><CiLock /></div>
                <p className='text-center text-xl '>Verify Your Email</p>
                <p className='text-sm text-gray-700 text-center mb-3'>A code has been sent to your email</p>
                {message != 'success' ? <p className='max-w-xs px-4 text-center text-xs mx-auto text-red-500'>
                    {message}
                </p> : <p className='text-sm text-center text-green-600'>You have being Signed Successfully</p>}
                <div className='flex justify-center py-3'>
                    <input type="text"  className='max-w-xs bg-gray-200 py-2 ps-3  text-3xl rounded' style={{"letterSpacing": "35px"}}
                        onChange={(e)=> setOtp(e.target.value)}
                        disabled={otp.split('').length >= 6}
                    />

                </div>
                    <button 
                    onClick={verifyEmail}
                    disabled={loading}
                    className={`w-full py-2 ${loading ? 'bg-gray-300' : 'bg-green-600 active:bg-green-700 hover:bg-green-500'} rounded text-white my-2  cursor-pointer`}>Verify{loading && '...'}</button>
            </div>
        </section>
    </div>
  )
}

export default verifyEmail