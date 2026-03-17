import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "../../../global";
import { FaHeart, FaRegCreditCard } from "react-icons/fa6";


const Pricing = () => {
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [oneTimeLoading, setOneTimeLoading] = useState(false);

  const startMonthlySupport = async () => {
    try {
      setMonthlyLoading(true);
      const res = await axios.post(`${backendurl}/subscription/start`, {});
      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url;
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Unable to start payment");
    } finally {
      setMonthlyLoading(false);
    }
  };

  const startOneTimeSupport = async () => {
    try {
      setOneTimeLoading(true);
      const res = await axios.post(`${backendurl}/subscription/start-one-time`, {});
      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url;
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Unable to start payment");
    } finally {
      setOneTimeLoading(false);
    }
  };

  return (
    <div className="min-h-[91vh] bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800">Support Ordorra</h2>
        <p className="text-gray-600 mt-3">
          Ordorra is free to use. If you want to support the project, you can make an
          optional payment below.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <button
            onClick={startMonthlySupport}
            disabled={monthlyLoading || oneTimeLoading}
            className="cursor-pointer flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaHeart />
            {monthlyLoading ? "Redirecting..." : "Support Monthly"}
          </button>
          <button
            onClick={startOneTimeSupport}
            disabled={monthlyLoading || oneTimeLoading}
            className="cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaRegCreditCard />
            {oneTimeLoading ? "Redirecting..." : "Support One-Time"}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          This support payment is optional and does not affect access to your store.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
