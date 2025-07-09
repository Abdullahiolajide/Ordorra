import React, { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { backendurl } from '../../global'
import axios from 'axios'

const Signin = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setUser(prevUser=>(
            {
                ...prevUser, 
                [e.target.name]: e.target.value
            }
        ))
    }
    const signIn = async()=>{
        const { email, password} = user;

        try {
            setLoading(true);

            const res = await axios.post(`${backendurl}/auth/signin`, {
            email,
            password
            });
            // alert("You have being Signed Up successfully")
            console.log(res.data);
            navigate('/dashboard')

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
    }

  return (
    <div className='flex items-center justify-center h-[90vh]]'>
        <section className=' mt-10 w-full max-w-xs  md:max-w-md'>
            <div><img src="images/store.png" alt="" width={50} className='mx-auto'/></div>
           <div className='text-center'>
             <h1 className='text-2xl'>Sign In to Ordorra</h1>
            <p className='text-sm'>Welcome back </p>
           </div>

            <div className='flex flex-col my-4 '>
                <label htmlFor="" className='text-sm py-1'>Email</label>
                <input 
                type="text"
                name='email'
                className='border border-gray-400 rounded px-3 py-2 w-full' 
                placeholder='Ex. example@gmail.com'
                onChange={handleChange}
                />
            </div>

             <div className='flex flex-col my-4'>
                <label htmlFor="" className='text-sm py-1'>Password</label>
                <input 
                type="text"
                name='password'
                className='border border-gray-400 rounded px-3 py-2 w-full' 
                placeholder='Enter your password'
                onChange={handleChange}
                />
            </div>

            <div>
                <button 
                className={`w-full py-2 ${loading ? 'bg-gray-300' : 'bg-green-600 active:bg-green-700 hover:bg-green-500'} rounded text-white my-2  cursor-pointer`}
                disabled={loading}
                onClick={signIn}
                >
                    Sign In{loading && '...'}
                </button>
            </div>
            <div className='flex space-x-2 justify-center'>
                <span>Don't have an account?</span> 
                <Link to={'/signup'}><span className='flex text-green-600 items-center justify-center'>Sign up<MdNavigateNext /></span> </Link>
            </div>

        </section>
    </div>
  )
}

export default Signin