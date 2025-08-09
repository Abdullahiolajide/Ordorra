import React, { useState, useEffect } from "react";
import AddProducts from "./AddProducts";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [storeInfo, setStoreInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    products: 11,
    visits: 51,
    orders: 12,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: store } = await axios.get("/api/store/info");
  //       setStoreInfo(store);

  //       const { data: statsData } = await axios.get("/api/store/stats");
  //       setStats(statsData);
  //     } catch (err) {
  //       setStoreInfo(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleCopy = () => {
    // if (!storeInfo) return;
    navigator.clipboard.writeText(`http://localhost:5173/store/${storeInfo.handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 p-4 md:p-8">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShow(false)}
      ></div>

      {/* Header */}
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-4 py-2 shadow transition"
          onClick={() => setShow(true)}
        >
          <span className="text-lg">+</span> Add Product
        </button>
      </section>

      {/* Store Link */}
      

      {/* Stats Cards */}
      {/* {storeInfo && ( */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Products</p>
            <p className="text-3xl font-bold text-gray-800">{stats.products}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Page Visits</p>
            <p className="text-3xl font-bold text-gray-800">{stats.visits}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Order Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
          </div>
        </section>
      {/* )} */}
      {!loading && (
        <section className="mb-8 p-4 bg-white border border-gray-400 rounded-lg shadow-sm flex items-center justify-between">
          
          {storeInfo ? (
            <>
              <div>
                <p className="text-gray-700 font-medium">Your Storefront Link:</p>
                <a
                  href={`http://localhost:5173/store/${storeInfo.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline break-all"
                >
                  {`http://localhost:5173/store/${storeInfo.handle}`}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="ml-4 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border transition"
              >
                <FiCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-start">
              <p className="text-gray-700 font-medium mb-2">
                You haven’t set up your store info yet.
              </p>
              <Link
                to="/storeinfo"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
              >
                Complete Store Setup
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Add Product Modal */}
      <section
        className={`fixed top-0 right-0 bg-white p-4 md:p-6 h-[100dvh] w-full md:w-[400px] shadow-xl transform transition-transform duration-300 ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute right-4 top-4 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <IoIosClose />
        </div>
        <AddProducts />
        <div className="flex justify-center">
          <button
            className="w-5/6 mx-auto bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded py-2 mt-4 transition"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
