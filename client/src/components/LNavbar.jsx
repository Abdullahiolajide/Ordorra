import React, { useState } from 'react'
import Icon from './Icon'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, Outlet } from 'react-router-dom'

const LNavbar = () => {
    const [show, setShow] = useState(false)
  return (
    <div>
        <nav className='py-3 md:py-4 px- shadow'>
            <div className='flex  max-w-7xl mx-auto'>
               {/* Desktop  */}
               <div className='px-4  w-full flex space-x-4 '>
                  <Link to={'/'}><div className='flex items-center text-xl md:text-3xl font-bold text-gray-700'><Icon /> Ordorra</div></Link>

                  <div className='md:hidden text-xl flex items-center cursor-pointer active:bg-gray-700/20 px-2 rounded ' 
                        onClick={()=> setShow(prev=> !prev)}>
                    <RxHamburgerMenu />
                  </div>

                     <main className='flex ml-auto space-x-7'>
                       <ul className='hidden md:flex items-center space-x-7 font-medium text-gray-700 '>
                          <Link to={"/"}><li className='hover:text-black cursor-pointer'>Home</li></Link>
                          <Link to={""}><li className='hover:text-black cursor-pointer'>Features</li></Link>
                          <Link to={""}><li className='hover:text-black cursor-pointer'>Pricing</li></Link>
                      </ul>
                      
                    <div className='flex space-x-2 float-right'>
                      <Link to={'/signup'}>
                        <button className='border border-green-600 rounded px-3 py-2 text-sm md:text-base text-green-700 hover:text-white         bg-green-100 hover:bg-green-700 font-medium cursor-pointer'>
                        Sign Up
                        </button>
                      </Link>
                      <Link to={'/signin'}>
                        <button className='text-white hover:text-green-700 border border-green-600 rounded px-3 py-2 text-sm md:text-base hover:bg-green-100 bg-green-700 font-medium cursor-pointer'>
                        Log In
                      </button>
                      </Link>
                    </div>
                     </main>
               </div>
              

            {/* Mobile Menu  */}
              <ul className={`md:hidden ${show ? 'translate-x-0' : '-translate-x-full'} duration-300 absolute md:flex items-center font-medium text-gray-700 mt-10 bg-white w-full items-center flex flex-col space-y-6 pb-4 shadow-md`} onClick={()=> setShow(prev=> !prev)}>
                <Link to={"/"}><li className='active:text-black cursor-pointer'>Home</li></Link>
                <Link to={""}><li className='active:text-black cursor-pointer'>Features</li></Link>
                <Link to={""}><li className='active:text-black cursor-pointer'>Pricing</li></Link>
            </ul>
            </div>
        </nav>

        <Outlet />
    </div>
  )
}

export default LNavbar