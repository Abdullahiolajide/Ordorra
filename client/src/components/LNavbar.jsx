import React, { useState } from 'react'
import Icon from './Icon'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, Outlet } from 'react-router-dom'

const LNavbar = () => {
    const [show, setShow] = useState(false)
  return (
    <div>
        <nav className='py-3 md:py-4 px- shadow'>
            <div className='flex justify-between  w-full max-w-7xl mx-auto'>
               {/* Desktop  */}
               <div className='px-4 justify-between w-full flex'>
                 <div className='flex items-center text-xl md:text-3xl font-bold text-gray-700'><Icon /> Ordorra</div>
                    <ul className='hidden md:flex items-center space-x-7 font-medium text-gray-700 '>
                        <Link to={""}><li className='hover:text-black cursor-pointer'>Features</li></Link>
                        <Link to={""}><li className='hover:text-black cursor-pointer'>Pricing</li></Link>
                        <Link to={"/signin"}><li className='hover:text-black cursor-pointer'>Sign In</li></Link>
                        <Link to={"/signup"}><li className='hover:text-black cursor-pointer'>Sign Up</li></Link>
                    </ul>
            <div className='md:hidden text-xl flex items-center cursor-pointer active:bg-gray-700/20 px-2 rounded ' onClick={()=> setShow(prev=> !prev)}><RxHamburgerMenu /></div>
               </div>

            {/* Mobile Menu  */}
              <ul className={`md:hidden ${show ? 'translate-x-0' : '-translate-x-full'} duration-300 absolute md:flex items-center font-medium text-gray-700 mt-10 bg-white w-full items-center flex flex-col space-y-6 pb-4 shadow-md`}>
                <Link to={""}><li className='active:text-black cursor-pointer'>Features</li></Link>
                <Link to={""}><li className='active:text-black cursor-pointer'>Pricing</li></Link>
                <Link to={"/signin"}><li className='active:text-black cursor-pointer'>Sign In</li></Link>
                <Link to={"/signup"}><li className='active:text-black cursor-pointer'>Sign Up</li></Link>
            </ul>
            </div>
        </nav>

        <Outlet />
    </div>
  )
}

export default LNavbar