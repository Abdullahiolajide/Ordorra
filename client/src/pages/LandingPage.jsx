import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <section>
            <div className='h-[90dvh] flex flex-col items-center'>
                <h1 className='text-5xl mx-2 md:text-6xl font-medium max-w-4xl text-center mt-20 md:mt-24'>
                    Create your store on WhatsApp with ease
                    </h1>
                <h3 className='text-center max-w-4xl md:text-xl my-4 mx-4'>Build a simple online storefront and manage your orders right from WhatsApp</h3>
            <div>
                <Link to={'/signup'}>
                    <button className='rounded-md bg-green-800 text-white px-4 py-2 hover:bg-green-700 duration-150 cursor-pointer'>Get Started</button>
                </Link>
            </div>

            <div>
                <img src="images/whatsappm.png" alt="" className='w-100'/>
            </div>
            </div>


        </section>
    </div>
  )
}

export default LandingPage