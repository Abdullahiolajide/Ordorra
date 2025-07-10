import React, { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { backendurl } from '../../global'
import axios from 'axios'

const ForgotPassword = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)

    const handleChange = (e)=>{
        setUser(prevUser=>(
            {
                ...prevUser, 
                [e.target.name]: e.target.value
            }
        ))
    }
    const sendCode = async()=>{
        const { email } = user;
        if (!email) {
            return setErrMsg('Enter your email')
        }

        try {
            setLoading(true);

            const res = await axios.post(`${backendurl}/auth/forgot-password`, { email });
            // alert("You have being Signed Up successfully")
            console.log(res.data);
            localStorage.setItem('ouseremail', email)
            navigate('/reset-password')

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
            <div><img src="https://img.icons8.com/?size=100&id=11320&format=png&color=000000" alt="" width={50} className='mx-auto'/></div>
           <div className='text-center'>
             <h1 className='text-2xl'>Forgot your password?</h1>
            <p className='text-sm'>Enter your email to receive a reset code </p>
            <p><small className='text-red-500'>{errMsg && errMsg}</small></p>
           </div>

            <div className='flex flex-col my-4 '>
                <label htmlFor="" className='text-sm py-1'>Email</label>
                <input 
                type="text"
                name='email'
                value={user?.email || ''}
                className={`border ${clicked && !user.email ?'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Ex. example@gmail.com'
                onChange={handleChange}
                />
            </div>

            <div>
                <button 
                className={`w-full py-2 ${loading ? 'bg-gray-300' : 'bg-green-600 active:bg-green-700 hover:bg-green-500'} rounded text-white my-2  cursor-pointer`}
                disabled={loading}
                onClick={()=> {sendCode(); setClicked(true)}}
                >
                    Send Code{loading && '...'}
                </button>
            </div>
            <div className='flex space-x-2 justify-center'>
                <span>I remember my password?</span> 
                <Link to={'/signin'}><span className='flex text-green-600 items-center justify-center'>Sign In<MdNavigateNext /></span> </Link>
            </div>

        </section>
    </div>
  )
}

export default ForgotPassword