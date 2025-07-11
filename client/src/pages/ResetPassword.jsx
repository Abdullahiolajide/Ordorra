import React, { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { backendurl } from '../../global'
import axios from 'axios'
import { myToast } from '../components/myToast'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [user, setUser] = useState({})
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name, value} = e.target
        setUser(prevUser=>(
            {
                ...prevUser, 
                [name]: value
            }
        ))
    }
    const reset = async () => {
        const { code, password, confirm_password } = user;
        const email = localStorage.getItem('ouseremail')
        if (!email) return navigate('/forgot-password')
        
        if (!code || !password || !confirm_password) {
            return setErrMsg('Fill in all fields')
        }

        if (password !== confirm_password) {
            setErrMsg('Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${backendurl}/auth/reset-password`, { email, code, newPassword: password });
            myToast(
                     <div className='text-center w-full max-w-xl'>
                              <h1 className='text-xl font-md text-black'>Password Changed</h1>
                              <p>Your password has been changed successfully, you can now sign in with your new password</p>
                              <button className='mt-2 p-2 bg-green-700 text-white rounded mx-auto' onClick={()=> toast.dismiss()}>Okay</button>
                    </div>
                )
            console.log(res.data);
            navigate('/signin')

            // or show toast

        } catch (err) {
            // better error handling
            if (err.response) {
            setErrMsg(err.response.data.message || 'Something went wrong');
            } else {
            setErrMsg('Network error');
            }
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className='flex items-center justify-center h-[90vh]]'>
        <section className=' mt-10 w-full max-w-xs  md:max-w-md'>
            <div><img src="https://img.icons8.com/?size=100&id=11320&format=png&color=000000" alt="" width={50} className='mx-auto'/></div>
           <div className='text-center'>
             <h1 className='text-2xl'>Reset your password</h1>
            <p className='text-sm'>Check your email for your reset code</p>
            <p><small className='text-red-500'>{errMsg && errMsg}</small></p>
           </div>

            <div className='flex flex-col my-4 '>
                <label htmlFor="" className='text-sm py-1'>Reset Code</label>
                <input 
                type="text"
                name='code'
                value={user?.code || ''}
                className={`border ${clicked && !user.code ? 'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Enter yout reset Code'
                onChange={handleChange}
                />
            </div>

             <div className='flex flex-col my-4'>
                <label htmlFor="" className='text-sm py-1'>New password</label>
                <input 
                type="password"
                name='password'
                value={user?.password || ''}
                className={`border ${clicked && !user.password ?'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Enter your password'
                onChange={handleChange}
                />
            </div>

            <div className='flex flex-col mt-2'>
                <label htmlFor="" className='text-sm py-1'>Confirm new password</label>
                <input 
                type="password"
                name='confirm_password'
                value={user?.confirm_password || ''}
                className={`border ${clicked && !user.confirm_password ?'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Confirm password'
                onChange={handleChange}
                />
            </div>
              <div className='flex space-x-2 text-sm'>
                <span>Didnt receive a code?</span> 
                <Link to={'/forgot-password'}><span className='flex text-green-600 items-center justify-center'>Resend</span> </Link>
            </div>

            <div>
                <button 
                className={`w-full py-2 ${loading ? 'bg-gray-300' : 'bg-green-600 active:bg-green-700 hover:bg-green-500'} rounded text-white my-2  cursor-pointer`}
                disabled={loading}
                onClick={()=> {reset(); setClicked(true)}}
                >
                    Reset Password{loading && '...'}
                </button>
            </div>
            <div className='flex space-x-2 justify-center'>
                <span>Already have an account?</span> 
                <Link to={'/signin'}><span className='flex text-green-600 items-center justify-center'>Sign in <MdNavigateNext /></span> </Link>
            </div>

        </section>
    </div>
  )
}

export default ResetPassword