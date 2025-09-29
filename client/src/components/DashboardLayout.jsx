import React, { createContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Icon from './Icon';
import { TbLayoutDashboardFilled, TbPackages } from 'react-icons/tb';
import { AiFillHome, AiOutlineClose } from 'react-icons/ai';
import { IoIosSettings } from 'react-icons/io';
import capitalize from 'just-capitalize';
import { MdBrandingWatermark } from 'react-icons/md';
import { IoLogOut, IoPersonCircle } from 'react-icons/io5';
import axios from 'axios';
import { backendurl } from '../../global';

const RefreshContext = createContext()

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const params= useParams()
  const path = location.pathname.split('/')
  const [refresh, setRefresh] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSModal, setShowSModal] = useState(false)
  const [subscribtion, setSubscribtion] = useState('')
  const [pl, setPl] = useState(0)


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, []);

   useEffect(()=>{
      getSubscriptionStatus()
    }, [])
    useEffect(()=>{
      getProducts()
    }, [refresh])

  const getSubscriptionStatus = async () => {
        const token = localStorage.getItem('token'); 
  
        try {
          const res = await axios.get(`${backendurl}/subscription/status`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const subscription = res.data.subscription;
          setSubscribtion(subscribtion)
          console.log(subscription)
          if (subscription.status == 'active') {
            setIsSubscribed(true)
          }else{
            setIsSubscribed(false)
          }

        } catch (error) {
          console.error('Error fetching subscription status:', error.response?.data || error);
        }
        
      };
      const getProducts = async () => {
      const token = localStorage.getItem('token'); 
      // setLoading(true)

      try {
        const res = await axios.get(`${backendurl}/products/get-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPl(res.data.length)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      // finally{
      //   setLoading(false)
      // }
    };

  return (
    <div className="dashboard-container lg:flex bg-gray-50 text-sm md:text-base">

      {showSModal && <div className="w-full h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">
      <div className="w-[450px] bg-white rounded-2xl shadow-lg p-6 relative">
        {/* Cancel Button */}
        <button
          onClick={() => setShowSModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Subscribe to Ordorra
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-5 leading-relaxed">
          You’ve reached the maximum number of products allowed on your current
          plan. To keep adding more products and unlock premium features, please
          upgrade your subscription.
        </p>

        {/* Features / Benefits */}
        <ul className="mb-6 space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
             ✅ <b>Add unlimited products now!</b>
          </li>
          {/* <li className="flex items-center gap-2">
            ✅ Get a personalized store link
          </li> */}
          {/* <li className="flex items-center gap-2">
            ✅ Priority customer support
          </li> */}
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowSModal(false)}
            className="cursor-pointer w-1/2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          >
            Maybe Later
          </button>
          <Link to={'pricing'} className='w-1/2'>
          <button
            className="cursor-pointer w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            onClick={() => setShowSModal(false)}
          >
            Upgrade Now
          </button></Link>
        </div>
      </div>
    </div>}

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
                <button className='text-green-00 px-2 cursor-pointer hover:text-green-800'>Upgrade plan</button>
              </Link>
            </div>
            <div className='flex items-center text-3xl'><IoPersonCircle /></div>
          </div>
        
        </header>
     
      <main className='px-4 w-full'>

       <div className=" min-h-screen lg:mt-10 text-sm md:text-base">
        <RefreshContext.Provider value={{ refresh, setRefresh, isSubscribed, setShowSModal, pl, subscribtion }}>
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
