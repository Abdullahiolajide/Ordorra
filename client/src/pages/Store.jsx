import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendurl } from "../../global";
import { useParams } from "react-router-dom";
import thousandify from 'thousandify'

const Store = () => {
    const params = useParams()
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState({})
  const [loading, setLoading] = useState(false)


  const getStore = async ()=>{
    setLoading(true)
    try{
        const res = await axios.get(`${backendurl}/store/info/${params.handle}`)
        setProducts(res.data.products)
        setStore(res.data.store)
        console.log(res.data)

    }catch(error){
        if (error.response) {
            console.log(error.response.data.message); // <-- "Store does not Exist"
            console.log(error.response.status); // 404
        } else {
            console.error(error.message);
        }
    }finally{

        setLoading(false)
    }
  }

  useEffect(()=>{
    getStore()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
         {loading && <div
            className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            >

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>}

      {/* Store Hero */}
      <div className="bg-green-600 text-white py-12 px-6 text-center">
        <div className=" rounded-4xl overflow-hidden w-fit mx-auto"><img src={store.storeLogo} alt="" className="w-35 h-35"/></div>
        <h1 className="text-4xl font-bold">{store.storeName}</h1>
        <p className="mt-2 text-lg opacity-90">
          {store.storeBio}
        </p>
          <p className="mt-1 text-xs text-lg opacity-90">
          /{store.handle}
        </p>
      </div>

      

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold mt-1">N{thousandify(product.price)}</p>
              <button className="cursor-pointer mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
