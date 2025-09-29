import React, { useContext } from 'react'
import { RefreshContext } from '../../components/DashboardLayout';
import { Link } from 'react-router-dom';

const Subscriptions = ()=>{
    const {Subscription, isSubscribed} = useContext(RefreshContext)
    if (isSubscribed){
        return (
            <div className='mt-20'>
                <section className='bg-white p-3 rounded-md'>
                    <Link to={'/dashboard/settings'}><div className='text-green-500'>back</div></Link>
                    <h1 className='text-2xl'>Ordorra Basic</h1>
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