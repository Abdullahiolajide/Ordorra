import React, { createContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from './Icon';
import { TbLayoutDashboardFilled, TbPackages } from 'react-icons/tb';
import { AiFillHome } from 'react-icons/ai';
import { IoIosSettings } from 'react-icons/io';
import capitalize from 'just-capitalize';
import { MdBrandingWatermark } from 'react-icons/md';

const RefreshContext = createContext()

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const params= useParams()
  const path = location.pathname.split('/')
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // redirect to login if no token
    }
  }, []);

  return (
    <div className="dashboard-container lg:flex ">
       <div className="h-16 w-64 bg-transparent hidden lg:block"></div>
      <section className='hidden lg:block border border-gray-300 h-[100vh] w-52 px-2 py-4 fixed'>
      <Link to={'/'}><div className='flex items-center text-xl md:text-2xl font-bold text-gray-700'><Icon /> Ordorra</div></Link>

      <ul className='mt-10 flex flex-col space-y-4'>
        <NavLink to={''} end className={({isActive})=> isActive ? 'text-green-500 bg-gray-300/30' : 'text-gray-700'}>
          <li className={`group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30`}>
            <span className=' group-hover:text-green-600 text-xl'><AiFillHome /></span>
            <span>Dashboard</span>
          </li>
        </NavLink>

        <NavLink to={'products'}  className={({isActive})=> isActive ? 'text-green-500 bg-gray-300/30' : 'text-gray-700'}>
          <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'> 
            <span className=' group-hover:text-green-600 text-xl'><TbLayoutDashboardFilled /></span>
            <span>Products</span>
          </li>
        </NavLink>

        <NavLink to={'store-info'}  className={({isActive})=> isActive ? 'text-green-500 bg-gray-300/30' : 'text-gray-700'}>
          <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'>
            <span className=' group-hover:text-green-600 text-xl'><MdBrandingWatermark /></span>
            <span>Store Info</span>
          </li>
        </NavLink>


        <NavLink to={'settings'}  className={({isActive})=> isActive ? 'text-green-500 bg-gray-300/30' : 'text-gray-700'}>
          <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'>
            <span className=' group-hover:text-green-600 text-xl'><IoIosSettings /></span>
            <span>Settings</span>
          </li>
        </NavLink>

        {/* <NavLink  className={'text-gray-700'}> */}
          <li className='cursor-pointer group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30' onClick={()=> {
            localStorage.removeItem('token')
            navigate('/signin', {replace: true})
            }}>
            <span className=' group-hover:text-green-600 text-xl'><IoIosSettings /></span>
            <span>Logout</span>
          </li>
        {/* </NavLink> */}
      </ul>

      </section>
        <header className='p-3 border border-gray-300 flex justify-center lg:hidden'>
          {/* <div className='text-2xl font-medium md:text-3xl'>{capitalize(path[path.length -1])} </div> */}
          <Link to={'/'}><div className='flex items-center text-xl md:text-2xl font-bold text-gray-700'><Icon /> Ordorra</div></Link>
        </header>
      <main className='px-4 w-full'>

        <div className='mb-20'>
          <RefreshContext.Provider value={{refresh, setRefresh}}>
            <Outlet />
          </RefreshContext.Provider>
        </div>

      </main>
      <section className='lg:hidden bg-white border border-gray-300 fixed w-full bottom-0'>
        <ul className='max-w-xl mx-auto flex justify-around'>
        <NavLink to={''} end className={({isActive})=> isActive ? 'text-green-500 ' : 'text-gray-700'}>
          <li className={`group flex flex-col items-center justify-center space-x-2 p-2 text-center`}>
            <span className='group-hover:text-green-600 text-xl text-center'><AiFillHome /></span>
            <span className='text-sm mt-1 mx-2'>Home</span>
          </li>
        </NavLink>

        <NavLink to={'products'}  className={({isActive})=> isActive ? 'text-green-500' : 'text-gray-700'}>
          <li className='group flex flex-col items-center justify-center space-x-2 p-2  text-center'> 
            <span className=' group-hover:text-green-600 text-xl'><TbLayoutDashboardFilled /></span>
            <span className='text-sm mt-1 mx-2 group-hover:text-green-600'>Products</span>
          </li>
        </NavLink>

        <NavLink to={'store-info'}  className={({isActive})=> isActive ? 'text-green-500 ' : 'text-gray-700'}>
          <li className='group flex flex-col items-center justify-center space-x-2 p-2  text-center'>
            <span className=' group-hover:text-green-600 text-xl'><MdBrandingWatermark /></span>
            <span className='text-sm mt-1 mx-2'>Store Info</span>
          </li>
        </NavLink>


        <NavLink to={'settings'}  className={({isActive})=> isActive ? 'text-green-500 ' : 'text-gray-700'}>
          <li className='group flex flex-col items-center justify-center space-x-2 p-2  text-center'>
            <span className=' group-hover:text-green-600 text-xl'><IoIosSettings /></span>
            <span className='text-sm mt-1 mx-2'>Settings</span>
          </li>
        </NavLink>

        
      </ul> 
      </section>
    </div>
  );
};

export default DashboardLayout;
export { RefreshContext }
