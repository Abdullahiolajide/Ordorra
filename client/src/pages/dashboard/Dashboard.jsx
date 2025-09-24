import React, { useState, useEffect, useContext } from "react";
import AddProducts from "./AddProducts";
import { IoIosClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import { backendurl } from "../../../global";
import { RefreshContext } from "../../components/DashboardLayout";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [storeInfo, setStoreInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [handle, setHandle] = useState(null)
  const { refresh, isSubscribed, setShowSModal } = useContext(RefreshContext)
  // const location = useLocation()
  const [stats, setStats] = useState({
    products: null,
    visits: null,
    orders: null,
  });


  useEffect(()=>{
      getProducts()
    }, [refresh])
  

    useEffect(() => {
      const fetchStoreInfo = async () => {
        setLoading(true)
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${backendurl}/store/info`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          if (res.data.handle) {
            // setFormData(res.data);
            // setIsEditing(true);
            setStoreInfo(true)
            setHandle(res.data.handle)
          }
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error('Error fetching store info:', err.response?.data || err.message);
            toast.error('Failed to fetch store information.');
          }
        }
        finally{
          setLoading(false)
        }
      };
  
    //  if (stats.products > 0) fetchStoreInfo();
      fetchStoreInfo();
    }, []);


    const getProducts = async () => {
      const token = localStorage.getItem('token'); 
      setLoading(true)

      try {
        const res = await axios.get(`${backendurl}/products/get-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(prev=> ({...prev, products: res.data.length}))
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally{
        setLoading(false)
      }
    };

    const paywallCheck = ()=>{
      if (!isSubscribed && stats.products >= 4) {
        console.log(isSubscribed)
        setShowSModal(true)
        return false
      }
      return true
    }

  const handleCopy = () => {
    // if (!storeInfo) return;
    navigator.clipboard.writeText(`${window.location.origin}/store/${handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 py-4 md:py-8">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShow(false)}
      ></div>
      {loading && 
     <div className={`fixed inset-0 min-h-screen z-50 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}>
            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>
      }

      {/* Header */}
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          className="text-sm cursor-pointer flex items-center md:gap-2 gap-1 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-2md: px-4 py-2 shadow transition"
          onClick={()=> paywallCheck() ? setShow(true) : ''}
        >
          <span className="md:text-lg flex items-center">+</span> Add Product
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
          {/* <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Page Visits</p>
            <p className="text-3xl font-bold text-gray-800">{stats.visits}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
            <p className="text-sm text-gray-500">Order Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
          </div> */}
        </section>
      {/* )} */}
      {!loading && (
        <section className="md:w-fit mb-8 p-4 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between">
          
          {storeInfo ? (
            <>
              <div>
                <p className="text-gray-700 font-medium">Your Storefront Link:</p>
                <a
                  href={`${window.location.origin}/store/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline break-all text-sm md:text-base"
                >
                  {`${window.location.origin}/store/${handle}`}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="ml-4 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition"
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
                to="store-info"
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
        className={`fixed top-0 right-0 bg-white p-4 md:p-6 h-[100dvh] w-full md:w-[400px] shadow-xl transform transition-transform duration-300 overflow-y-auto h-full z-10  ${
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
