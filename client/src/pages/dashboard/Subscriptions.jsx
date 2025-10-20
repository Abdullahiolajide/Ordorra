import React, { useContext } from 'react'
import { RefreshContext } from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';
import { backendurl } from '../../../global';
import axios from 'axios';

const Subscriptions = ()=>{
    const {subscription, isSubscribed} = useContext(RefreshContext)
    console.log(subscription)
    const npdate = new Date(subscription.nextPaymentDate)


    const cancelSubscription = async()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${backendurl}/subscription/cancel`, 
                {},
                {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res)

        }catch(err){
            console.log(err.response?.data.error || err.message)
        }
    } 

    if (isSubscribed){
        return (
            <div className='lg:mt-18 mt-6 min-h-[91vh]'>
                <section className='bg-white p-3 rounded-md'>
                    <Link to={'/dashboard/settings'}><div className='text-green-500'>back</div></Link>
                   <div className=' p-3 w-fit mt-5'>
                     <h1 className='text-xl mb-4'>Ordorra Basic</h1>
                        <div className='space-y-3'>
                            <div>
                                <label htmlFor="">Email</label>
                                <p className='text-gray-400 text-sm'>{subscription.email}</p>
                            </div>
                            <div>
                                <label htmlFor="">Subscription Status</label>
                                <p className='text-gray-400 text-sm'>{subscription.status}</p>
                            </div>
                            <div>
                                <label htmlFor="">Next Payment Date</label>
                                <p className='text-gray-400 text-sm'>{npdate.toDateString()} ({npdate.toLocaleDateString()})</p>
                            </div>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <button className='bg-green-400 cursor-pointer hover:bg-green-500 px-3 py-2 rounded-lg text-white'>Manage Subscription</button>
                            <button 
                            onClick={cancelSubscription}
                            className='cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition mt-3'>
                                Cancel Subscription
                            </button>
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