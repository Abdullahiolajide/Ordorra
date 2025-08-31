import React, { createContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from './Icon';
import { TbLayoutDashboardFilled, TbPackages } from 'react-icons/tb';
import { AiFillHome } from 'react-icons/ai';
import { IoIosSettings } from 'react-icons/io';
import capitalize from 'just-capitalize';
import { MdBrandingWatermark } from 'react-icons/md';
import { IoLogOut, IoPersonCircle } from 'react-icons/io5';

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
    <div className="dashboard-container lg:flex bg-gray-50 text-sm md:text-base">
       <div className="h-16 w-64 bg-transparent hidden lg:block"></div>
      <section className='hidden lg:block border border-gray-300 h-[100vh] w-52 px-2 py-4 fixed bg-white'>
  <Link to={'/'}><div className='flex items-center text-xl md:text-2xl font-bold text-gray-700'><Icon /> Ordorra</div></Link>

  <ul className='mt-10 flex flex-col justify-between h-[calc(100%-2.5rem)]'> 
    <div className="flex flex-col space-y-4">
      <NavLink to={''} end className={({isActive})=> isActive ? 'text-green-500 bg-green-300/30 rounded-md' : 'text-gray-700'}>
        <li className={`group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30`}>
          <span className=' group-hover:text-green-600 text-xl'><AiFillHome /></span>
          <span>Dashboard</span>
        </li>
      </NavLink>

      <NavLink to={'products'}  className={({isActive})=> isActive ? 'text-green-500 bg-green-300/30' : 'text-gray-700'}>
        <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'> 
          <span className=' group-hover:text-green-600 text-xl'><TbLayoutDashboardFilled /></span>
          <span>Products</span>
        </li>
      </NavLink>

      <NavLink to={'store-info'}  className={({isActive})=> isActive ? 'text-green-500 bg-green-300/30 rounded-md' : 'text-gray-700'}>
        <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'>
          <span className=' group-hover:text-green-600 text-xl'><MdBrandingWatermark /></span>
          <span>Store Info</span>
        </li>
      </NavLink>

      <NavLink to={'settings'}  className={({isActive})=> isActive ? 'text-green-500 bg-green-300/30 rounded-md' : 'text-gray-700'}>
        <li className='group flex items-center space-x-2 p-2 rounded hover:bg-gray-300/30'>
          <span className=' group-hover:text-green-600 text-xl'><IoIosSettings /></span>
          <span>Settings</span>
        </li>
      </NavLink>
    </div>

    {/* Logout at the bottom */}
    <li 
      className='cursor-pointer group flex items-center space-x-2 p-2 mb-10 rounded hover:bg-gray-300/30 hover:text-red-600'
      onClick={()=> {
        localStorage.removeItem('token')
        navigate('/signin', {replace: true})
      }}>
      <span className=' group-hover:text-red-600 text-xl'><IoLogOut /></span>
      <span>Logout</span>
    </li>
  </ul>
</section>

       <div className='h-14'></div>
        <header className='p-3 border border-gray-300 flex justify-between idden fixed z-10 w-full top-0 bg-white'>
          {/* <div className='text-2xl font-medium md:text-3xl'>{capitalize(path[path.length -1])} </div> */}
          <Link to={'/'}><div className='flex items-center text-xl md:text-2xl font-bold text-gray-700'><Icon /> Ordorra</div></Link>
          <div className='flex'>
            <div className="mb-2 flex items-center h-full">
              <Link to={'pricing'}>
                <button className='text-green-600 px-2 cursor-pointer hover:text-green-800'>Upgrade plan</button>
              </Link>
            </div>
            <div className='flex items-center text-3xl'><IoPersonCircle /></div>
          </div>
        
        </header>
     
      <main className='px-4 w-full'>

       <div className="mb-20 min-h-screen lg:mt-10 text-sm md:text-base">
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <Outlet />
        </RefreshContext.Provider>
      </div>


      </main>

      {/* mobile below */}
      <nav className="lg:hidden bg-white border-t border-gray-200 fixed w-full bottom-0 shadow-sm">
      <ul className="max-w-xl mx-auto flex justify-around py-1">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-2 ${
              isActive ? "text-green-600" : "text-gray-600 hover:text-green-500"
            }`
          }
        >
          <AiFillHome className="text-xl" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-2 ${
              isActive ? "text-green-600" : "text-gray-600 hover:text-green-500"
            }`
          }
        >
          <TbLayoutDashboardFilled className="text-xl" />
          <span className="text-xs">Products</span>
        </NavLink>

        <NavLink
          to="store-info"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-2 ${
              isActive ? "text-green-600" : "text-gray-600 hover:text-green-500"
            }`
          }
        >
          <MdBrandingWatermark className="text-xl" />
          <span className="text-xs">Store Info</span>
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-2 ${
              isActive ? "text-green-600" : "text-gray-600 hover:text-green-500"
            }`
          }
        >
          <IoIosSettings className="text-xl" />
          <span className="text-xs">Settings</span>
        </NavLink>
      </ul>
    </nav>
    </div>
  );
};

export default DashboardLayout;
export { RefreshContext }
