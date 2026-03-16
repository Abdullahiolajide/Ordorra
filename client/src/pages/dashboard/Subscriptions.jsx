import React, { useContext, useEffect, useState } from 'react'
import { RefreshContext } from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { backendurl } from '../../../global';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Subscriptions = ()=>{
    const {subWarning} = useContext(RefreshContext)
    const [showModal, setShowModal] = useState(false)
    const [subscription, setSubscription] = useState()
    const [loading, setLoading] = useState(false)
    const npdate = new Date(subscription?.nextPaymentDate)
    useEffect(()=>{
         getSubscriptionStatus()
       }, [])
    
      const getSubscriptionStatus = async () => { 
      
            try {
                setLoading(true)
                const res = await axios.get(`${backendurl}/subscription/status`);
                
                ;
                setSubscription(res.data.subscription)
                
            } catch (error) {
                console.error('Error fetching subscription status:', error.response?.data || error);
            }finally{
                
                setLoading(false)
            }
            
          };

    const cancelSubscription = async()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${backendurl}/subscription/cancel`, 
                {});
            // console.log(res)

        }catch(err){
            console.log(err.response?.data.error || err.message)
        }finally{
            // setRefresh(prev=> !prev)
            window.location.href = `${window.location.origin}/dashboard/settings/subscribtions`
            
        }
    } 
    const enableSubscription = async()=>{
        try {

            const res = await axios.post(
            `${backendurl}/subscription/start`,
            {},
           
            );

            if (res.data.authorization_url) {
            window.location.href = res.data.authorization_url;
            }
        } catch (err) {
            // console.log(err.response?.data || err.message);
            toast.error(
            <div>
                <h1>{err.response?.data.error || err.message}</h1>
            </div>
            )
        }
    }
    if (loading) {
        return (
            <div className='h-[60vh] flex items-center justify-center w-full'>
                <div className='border border-4 border-green-500 h-10 w-10 rounded-full animate-spin border-b-transparent'></div>
            </div>
        )
    }

    if (subscription){
        return (
            <div className='lg:mt-18 mt-6 min-h-[91vh]'>
                {showModal && <div className="w-full  h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">
                      <div className="w-[450px] mx-5 bg-white rounded-2xl shadow-lg p-6 relative">
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                        >
                          <AiOutlineClose size={22} />
                        </button>
                        <h2 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">
                          Cancel Subscribtion
                        </h2>
                
                        {/* Message */}
                        <p className="text-gray-600 mb-5 leading-relaxed">
                          Your Subscription will be cancelled and you will lose access to ordorra basic features at the end of your subscription cycle
                        </p>
                        <div className='flex gap-3'>
                            <button 
                            onClick={cancelSubscription}
                            className='cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition mt-3'>
                                Cancel Subscription
                            </button> 
                            <button 
                            onClick={()=> setShowModal(prev=> !prev)}
                            className='cursor-pointer bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition mt-3'>
                                Stay
                            </button> 


                        </div>
                        
                      </div>
                    </div>}
                <section className='bg-white p-3 rounded-md'>
                    <Link to={'/dashboard/settings'}><div className='text-green-500'>back</div></Link>
                   <div className=' p-3 w-fit mt-5'>
                     <h1 className='text-xl mb-4'>Ordorra Basic</h1>
                        <div className='space-y-3'>
                            <div>
                                <label htmlFor="">Email</label>
                                <p className='text-gray-400 text-sm'>{subscription?.email}</p>
                            </div>
                            <div>
                                <label htmlFor="">Payment Type</label>
                                <p className='text-gray-400 text-sm'>{subscription?.paymentType}</p>
                            </div>
                            <div>
                                <label htmlFor="">Status</label>
                                <p className='text-gray-400 text-sm'>{!subWarning ? subscription?.status : "calcelled"}</p>
                            </div>
                            <div>
                                <label htmlFor="">Next Payment Date</label>
                                <p className='text-gray-400 text-sm'>{npdate?.toDateString() || "-"} ({npdate?.toLocaleDateString() || "-"})</p>
                            </div>
                        </div>
                        <div className='flex flex-col mt-4'>
                            {subscription?.paymentType != "one-time" ? <span>
                                { subscription?.status == "active" && <button 
                            onClick={()=> setShowModal(prev=> !prev)}
                            className='cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition mt-3'>
                                Cancel Subscription
                            </button> }

                           {subscription?.status == "cancelled" || subscription?.status == "pending" ? <button 
                            onClick={enableSubscription}
                            className='cursor-pointer bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition mt-3'>
                                Enable Subscription
                            </button> : null}

                           {subscription?.status === "non-renewing" && (
                            <p className="text-sm text-gray-700">
                                <span>You have disabled your subscription. You will not be charged again this cycle.</span>
                                <br />
                                <span>
                                You will be able to re-enable your subscription after this subscription period ends ({npdate?.toDateString()}).
                                </span>
                            </p>
                            )}
                            </span> : 
                            
                            <p className='text-sm text-gray-700'>
                              <span>You are on a One-time plan</span>
                                <br />
                                <span>
                                You will be able to change your payment type after this payment period ends({npdate?.toDateString()}).
                                </span> 
                            </p>}

                        </div>
                   </div>
                </section>
                
            </div>
        )
    }else{

        return (
            <>
                <div className='flex items-center justify-center px-4 min-h-screen text-center'>
                    <div className='text-3xl'>
                        You do not have an Active Subscribtion
                        <Link to={'/dashboard/pricing'}> <div className='py-3 text-green-500 text-lg'>View Plans</div> </Link>
                    </div>
                </div>
            </>
    )
}
}

export default Subscriptions;