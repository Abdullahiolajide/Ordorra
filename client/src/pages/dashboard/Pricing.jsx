import React, { useContext, useState } from "react";
import { backendurl } from "../../../global";
import axios from "axios";
import thousandify from 'thousandify'
import { FaInfo, FaRegCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RefreshContext } from "../../components/DashboardLayout";
import { AiOutlineClose } from "react-icons/ai";


const Pricing = () => {
  const [planIndex, setPlanIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [paying, setPaying] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const {isSubscribed, subscription, subWarning} =  useContext(RefreshContext)
    const plans = [
      {
        name: "Free",
        price: "0",
        description: "Basic access with limited features",
      },
      {
        name: "Basic",
        price: "1000",
        planCode: 'PLN_zn8ledck323v0kl',
        description: "Unlock more products and features",
      },
    ];

  const handleSubscribe = async () => {
  try {
    setSubscribing(true)
    
    const res = await axios.post(
      `${backendurl}/subscription/start`,
      {}
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
    }finally{

      setSubscribing(false)
    }
};
 const oneTimeSubscribe = async () => {
  try {
    setPaying(true)
    const res = await axios.post(
      `${backendurl}/subscription/start-one-time`,
      {}
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
    }finally{
      setPaying(true)
    }
      
};


if (!planIndex) {
  return (
    <div className=" min-h-[91vh] flex flex-col items-center p-6 bg-gray-50 mb-10">
      <h2 className="text-3xl font-bold mb-8 mt-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl ">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className="p-6 bg-white shadow-lg rounded-2xl text-center"
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-semibold my-4">₦{thousandify(plan.price)} <span className="text-base">/month</span></p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <button
            disabled={!subWarning  && subscription?.status == "active" || subscription?.status == "non-renewing"}
              onClick={()=> setPlanIndex(i)}
              className={`px-6 py-2  text-white rounded-lg  
                ${!subWarning  && subscription?.status == "active" || subscription?.status == "non-renewing" ? "bg-gray-600 cursor-not-allowed" :"bg-green-600 cursor-pointer hover:bg-green-700"}
                `}
            >
              {/* {plan.name == 'Free' && !isSubscribed ? "Free Plan" : "Select Plan"} */}
              {plan.name == "Free" ? "Free Plan" :''}
              {plan.name != 'Free' && isSubscribed ? "Current Plan" : ""}
              {plan.name!= "Free" && !isSubscribed ? 'Select Plan' :''}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
else{
  return(
    <div className="flex flex-col items-cente pt-8 pb-6 bg-gray-50 min-h-[110vh]">
      {showModal && <div className="w-full  h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">
          <div className="w-[450px] mx-5 bg-white rounded-2xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <AiOutlineClose size={22} />
            </button>
          <h2 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">
            Choose Payment Method
          </h2>

          <div className="text-gray-600 mb-5 leading-relaxed">
            How would you like to pay for this plan?

            <div className="border rounded-full w-fit p-1 text-xs mt-3">
              <FaInfo />
            </div>

            <small>
              <span className="text-green-600 font-medium">Subscribe</span> — you’ll be billed automatically every month (you can cancel anytime).
            </small><br />

            <small>
              <span className="text-green-600 font-medium">Pay Once</span> — you’ll be charged only once and will renew manually if you want to continue later.
            </small>
          </div>

          <div className='flex gap-3'>
            <button 
             onClick={()=>{
              
              oneTimeSubscribe()
            }}
              className='cursor-pointer bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition mt-3'>
             
              {!paying ? "Pay Once" : "Paying..."}
            </button> 

            <button 
            onClick={()=>{
              
              handleSubscribe()
            }}
            disabled={subscribing}
              className='cursor-pointer bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition mt-3'>
             {!subscribing ? " Subscribe" : "Subscribing..."}
            </button> 

                    </div>

            
          </div>
        </div>}

      <div className="flex justify-between mb-8">
       <div>
        <p className="font-medium">Complete your purchase</p>
        <p className="text-sm text-gray-600">Review your plan details and proceed with secure payment</p>
       </div>

       <button className="bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-2 rounded text-white" onClick={()=> setPlanIndex(null)}>Cancel</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="col-span-2 bg-white border border-gray-300 rounded-2xl overflow-hidden">

          <div className="flex bg-green-100 py-3 px-5">
            <div className="h-10 w-10 rounded-xl bg-green-400 flex items-center justify-center">
              <FaRegCircleCheck className="text-white text-md font-bold"/>
            </div>
          <div className="px-2">
            <p className="font-medium">Plan Selected</p>
            <p className="text-sm text-gray-600">Youre upgrading to basic</p>
          </div>
          </div>

          <div className="border border-gray-300 rounded-2xl mx-6 my-6 h-fit p-5 space-y-3">
            <p className="flex justify-between"><span className="text-gray-600">Plan:</span> <span className="font-medium">Basic</span></p>
            <p className="flex justify-between"><span className="text-gray-600">Billing:</span><span className="font-medium">Monthly</span></p>
            <p className="flex justify-between">
              <span className="text-gray-600">Base Price:</span> 
              <span className="font-medium">₦{thousandify(plans[planIndex].price)}</span>
            </p>
            <hr className="border-gray-300"/>
            <p className="flex justify-between">
              <span className="text-gray-800 font-bold">Total:</span> 
              <span className="font-medium text-green-600">₦{thousandify(plans[planIndex].price)}</span>
            </p>

          </div>

        </div>


        <div className="h-fit col-span-1 bg-white mx-2 border border-gray-300 rounded-2xl">
          <div className=" mx-6 my-6">
            <p className="text-xl">Payment Summary</p>
            <p className="flex justify-between my-4">
              <span className="text-gray-600 ">Subtotal:</span> 
              <span className="">₦{thousandify(plans[planIndex].price)}</span>
            </p>
            <hr className="border-gray-300"/>

            <p className="flex justify-between my-4">
              <span className="text-gray-800 font-bold">Total:</span> 
              <span className="font-medium text-green-600">₦{thousandify(plans[planIndex].price)}</span>
            </p>

            <button className={`bg-green-600 hover:bg-green-700 cursor-pointer text-white w-full rounded-md py-3 font-bold`}
            onClick={()=> setShowModal(prev=> !prev)}
            >Pay ₦{thousandify(plans[planIndex].price)}</button>

          </div>

        </div>
      </div>
    </div>
  )
}
};

export default Pricing;
