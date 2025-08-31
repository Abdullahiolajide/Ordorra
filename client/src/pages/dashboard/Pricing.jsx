import React from "react";
import { backendurl } from "../../../global";
import axios from "axios";


const Pricing = () => {
    const plans = [
      {
        name: "Free",
        price: "₦0",
        description: "Basic access with limited features",
      },
      {
        name: "Basic",
        price: "₦1000",
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
    alert("Error starting subscription");
  }
};



  return (
    <div className=" flex flex-col items-center p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 mt-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 bg-white shadow-lg rounded-2xl text-center"
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-2xl font-semibold my-4">{plan.price} <span className="text-base">/month</span></p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <button
              onClick={() => handleSubscribe()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
            >
              {plan.name === "Free" ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
