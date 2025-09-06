import axios from 'axios'
import thousandify from 'thousandify'
import React, { useContext, useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { backendurl } from '../../../global'
import { IoIosClose } from 'react-icons/io'
import AddProducts from './AddProducts'
import { RefreshContext } from '../../components/DashboardLayout'
import { SlOptionsVertical } from 'react-icons/sl'
import { toast } from 'react-toastify'

const Products = () => {
  const [userProducts, setUserProducts] = useState([])
  const [show, setShow] = useState(false)
  const [actions, setActions] = useState(null)
  const [productInfo, setProductInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState({})
  // const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const { refresh, isSubscribed, setShowSModal } = useContext(RefreshContext)

  useEffect(()=>{
    getProducts()
  }, [refresh])
 

    const getProducts = async () => {
      const token = localStorage.getItem('token'); 
      setLoading(true)

      try {
        const res = await axios.get(`${backendurl}/products/get-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(res.data, );
        setUserProducts(res.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally{
        setLoading(false)
      }
    };

    const deleteProduct = async (productId) => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.delete(`${backendurl}/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        
        getProducts(); 
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    
    // const showAddSlider = ()=>{
    //   // if (subscription.status != 'active' && userProducts.length >= 4){
    //   //   toast.info('You have exceeded your product limit')
    //   //   return setShowSubscriptionModal(true)
    //   // }

    //   setShow(true)
    // }
    const paywallCheck = ()=>{
      if (!isSubscribed && userProducts.length >= 4) {
        console.log(isSubscribed)
        setShowSModal(true)
        return false
      }
      return true
    }




  


  return (
  <div className="relative">
    {/* Backdrop */}
    <div
      className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
        show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => {
        setProductInfo(null);
        setShow(false);
      }}
    ></div>
     {loading && 
     <div className={`fixed inset-0 min-h-screen z-50 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}>
            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>
      }

    <div className="text-2xl font-semibold text-gray-800 md:py-8 py-2">Products</div>

    {/* Search & Add */}
    <div className='rounded shadow'>
      <div className="p-2 flex text-sm flex gap-2 justify-between bg-white">
      <input
        type="text"
        placeholder="Search Product"
        className="w-4/6 md:w-fit border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      />
      <button
        className="whitespace-nowrap flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-2 md:px-4 py-2 md:py-3  transition"
        onClick={()=> paywallCheck() ? setShow(true) : ''}
      >
        <IoAddOutline className="text-xl whitespace-nowrap
" /> Add Product
      </button>
    </div>

    {/* Table */}
    <div className="rounded-lg border border-gray-200">
      <table className="w-full text-sm md:text-base">
        <thead className="bg-white text-gray-700">
          <tr>
            <th className="px-3 py-3 text-left w-1">ID</th>
            <th className="px-3 py-3 text-left w-1">Image</th>
            <th className="px-3 py-3 text-left">Name</th>
            <th className="px-3 py-3 text-left w-1 md:whitespace-nowrap">Price (₦)</th>
            <th className="px-3 py-3 text-center w-1"></th>
          </tr>
        </thead>
        <tbody className='bg-white font-light'>
          {userProducts.map((product, index) => (
            <tr
              key={index}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="px-3 py-2">{index + 1}</td>
              <td className="px-3 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="px-3 py-7 ">{product.name}</td>
              <td className="px-3 py-2">{thousandify(product.price)}</td>
              <td className="px-3 py-2 text-center relative">
                <button
                  className={`p-1.5 cursor-pointer rounded-full hover:bg-gray-200 transition ${
                    actions === index ? 'bg-gray-200' : ''
                  }`}
                  onClick={() =>
                    setActions((prev) => (prev === null ? index : null))
                  }
                >
                  <SlOptionsVertical className="text-gray-400" />
                </button>

                {/* Dropdown menu */}
                {actions === index && (
                  <div
                    className="absolute right-8 top-5 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50"
                    onClick={() => setActions(null)}
                  >
                    <div
                      className="px-6 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                      onClick={() => {
                        setProductInfo(product);
                        setShow(true);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="px-6 py-2 text-red-500 hover:bg-gray-100 cursor-pointer transition"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    {/* Adding slide  */}
    <section
      className={`fixed top-0 right-0 bg-white h-[100dvh] shadow-lg z-50 transition-transform duration-300 w-full md:w-[450px] ${
        show ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-3xl cursor-pointer transition"
        onClick={() => {
          setProductInfo(null);
          setShow(false);
        }}
      >
        <IoIosClose />
      </div>

      <div className="p-6 overflow-y-auto h-full">
        <AddProducts productInfo={productInfo} />

        <div className="flex justify-center mt-6">
          <button
            className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg py-2 transition"
            onClick={() => {
              setProductInfo(null);
              setShow(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  </div>
);

}

export default Products