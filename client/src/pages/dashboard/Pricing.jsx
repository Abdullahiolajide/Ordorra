import React, { useState } from "react";
import { backendurl } from "../../../global";
import axios from "axios";
import thousandify from 'thousandify'
import { FaRegCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";


const Pricing = () => {
  const [planIndex, setPlanIndex] = useState(null)
    const plans = [
      {
        name: "Free",
        price: "₦0",
        description: "Basic access with limited features",
      },
      {
        name: "Basic",
        price: "1000",
        planCode: 'PLN_1a0anpb9m9vmgu8',
        description: "Unlock more products and features",
      },
    ];

  const handleSubscribe = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const res = await axios.post(
      `${backendurl}/subscription/start`,
      {}, // request body (empty since you don’t send data here)
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.data.authorization_url) {
      window.location.href = res.data.authorization_url;
    } else {
      alert("Failed to start subscription");
    }
  } catch (err) {
    console.log(err.response?.data || err.message);
    toast.error('You already have an active Subscription')
    alert("Error starting subscription");
  }
};


if (!planIndex) {
  return (
    <div className=" flex flex-col items-center p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 mt-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className="p-6 bg-white shadow-lg rounded-2xl text-center"
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-semibold my-4">{plan.price} <span className="text-base">/month</span></p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <button
              onClick={()=> setPlanIndex(i)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
            >
              {plan.name === "Free" ? "Current Plan" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
else{
  return(
    <div className="flex flex-col items-cente pt-8 pb-6 bg-gray-50">

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

            <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white w-full rounded-md py-3 font-bold"
            onClick={handleSubscribe}
            >Pay ₦{thousandify(plans[planIndex].price)}</button>

          </div>

        </div>
      </div>
    </div>
  )
}
};

export default Pricing;
