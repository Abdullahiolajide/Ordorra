import React, { useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { backendurl } from '../../global'
import axios from 'axios'
import { myToast } from '../components/myToast'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { AiOutlineClose } from 'react-icons/ai'

const Signin = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [showModal, setShowModal] = useState(false)
   

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
        if (!email || !password) {
            return setErrMsg('Fill in all fields')
        }

        try {
            setLoading(true);

            const res = await axios.post(`${backendurl}/auth/signin`, {
            email,
            password
            });
            toast.success("Signed In Successfully")
            // localStorage.setItem('token', res.data.token)
            // console.log(res.data);
            if (window.gtag) {
                    window.gtag('event', 'sign_in');
                }
            navigate('/dashboard')

            // or show toast

        } catch (err) {
            // better error handling
            if (err.response) {
                if (err.response.data.verified == false) {
                    setShowModal(true)
                }
            setErrMsg(err.response.data.message || 'Something went wrong');
            } else {
            setErrMsg('Network error');
            }
        } finally {
            setLoading(false);
            
        }
    }
    const resendVerificationCode = async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            await axios.post(`${backendurl}/auth/resend-code`, { email: user.email })
            toast.success("Verification code sent")
            localStorage.setItem('ouseremail', user.email)
            navigate('/verify-email')
        }catch(err){
            if (err.response) {
            setErrMsg(err.response.data.message || 'Something went wrong');
            } else {
            setErrMsg('Network error');
            }
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='flex items-center justify-center h-[90vh]]'>
        {showModal && 
        <div className="w-full  h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">
            <div className="w-[450px] mx-5 bg-white rounded-2xl shadow-lg p-6 relative">
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
                <AiOutlineClose size={22} />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">
                Verify Email
            </h2>
    
            {/* Message */}
            <p className="text-gray-600 mb-5 leading-relaxed">
                Your email has not been verified yet
            </p>
            <form action="" onSubmit={(e)=> resendVerificationCode(e)}>
                <div>
                    <label htmlFor="">Email</label> <br />
                    <input 
                    type="email" 
                    value={user?.email || ''}
                    onChange={handleChange}
                    required
                    className='border rounded border-gray-200 py-1 w-full px-2'/>
                </div>
                <div className='flex gap-3'>
                    <button 
                    type='submit'
                    disabled={loading}
                    // onClick={cancelSubscription}
                    className='cursor-pointer bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition mt-3'>
                        Send verification code{loading && '...'}
                    </button> 


                </div>
            </form>
            
            </div>
        </div>}
        <section className=' mt-10 w-full max-w-xs  md:max-w-md'>
            <div><img src="images/store.png" alt="" width={50} className='mx-auto'/></div>
           <div className='text-center'>
            <Helmet>
                <title>Ordorra - Sign In to your account</title>
                <meta
                name="description"
                content="Sign In to your account or create an account to get started"
                />
            </Helmet>
             <h1 className='text-2xl'>Log In</h1>
            <p className='text-sm'>Welcome back </p>
            <p><small className='text-red-500'>{errMsg && errMsg}</small></p>
           </div>

            <div className='flex flex-col my-4 '>
                <label htmlFor="" className='text-sm py-1'>Email</label>
                <input 
                type="email"
                name='email'
                value={user?.email || ''}
                className={`border ${clicked && !user.email ?'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Ex. example@gmail.com'
                onChange={handleChange}
                />
            </div>

             <div className='flex flex-col mt-4 mb-1'>
                <label htmlFor="" className='text-sm py-1'>Password</label>
                <input 
                type="password"
                name='password'
                value={user?.password || ''}
                className={`border ${clicked && !user.password ?'border-red-600' : 'border-gray-400'} rounded px-3 py-2 w-full`} 
                placeholder='Enter your password'
                onChange={handleChange}
                />
            </div>
            <Link to={'/forgot-password'}><p className='text-green-600 text-sm mb-2 cursor-pointer'>Forgot password?</p></Link>

            <div>
                <button 
                className={`w-full py-2 ${loading ? 'bg-gray-300' : 'bg-green-600 active:bg-green-700 hover:bg-green-500'} rounded text-white my-2  cursor-pointer`}
                disabled={loading}
                onClick={()=> {signIn(); setClicked(true)}}
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