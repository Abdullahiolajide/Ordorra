import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendurl } from "../../global";
import { useParams } from "react-router-dom";
import thousandify from 'thousandify'
import { IoIosClose } from "react-icons/io";
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiShoppingCart } from "react-icons/fi";
// import { Icon } from "../..Icon";

const Store = () => {
  const params = useParams()
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState({})
  const [showProductModal, setShowProductModal] = useState(false)
  const [displayImage, setDisplayImage] = useState('')
  const [store, setStore] = useState({})
  const [loading, setLoading] = useState(false)


  const getStore = async ()=>{
    setLoading(true)
    try{
        const res = await axios.get(`${backendurl}/store/info/${params.handle}`)
        setProducts(res.data.products)
        setStore(res.data.store)

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

  const addToCart = (i)=>{
    localStorage.setItem(JSON.stringify(products[1]), 'cart')
  }

  return (
    // loader 
    <div className="bg-gray-50 min-h-screen">
      {/* View Image Modal  */}
          {displayImage && <div className="flex w-full h-full items-center justify-center absolute z-100 fixed bg-black/40 inset-0">
          <div className="w-full h-full absolute -z-1" onClick={()=> setDisplayImage('')}></div>
           <div className="absolute right-2 top-2 text-4xl text-gray-300 hover:text-white-700 cursor-pointer" onClick={()=> setDisplayImage('')}>
                          <IoIosClose />
                </div>
            <img src={displayImage} alt="" className="lg:max-h-150 lg:max-w-270 px-2 max-h-[80vh] py-2 lg:px-0" />
          </div>}
      {/* View Image Modal end */}

        {/* View Prouct Modal  */}
          {showProductModal && <section>
            <div className={`fixed inset-0 z-50 px-2 md:px-0 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}>
              <div className="w-full h-full absolute -z-1" onClick={()=> setShowProductModal(false)}></div>
              <div className="zoom bg-white w-100 max-h-170 rounded-2xl boder border-gray-300 relative px-4 py-4 flex flex-col justify-between">
                <div className="absolute right-2 top-2 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer" onClick={()=> setShowProductModal(false)}>
                          <IoIosClose />
                </div>

               <div>
                 <div className="mt-6 rounded-md overflow-hidden max-h-55 cursor-pointer">
                  <img src={products[currentProductIndex].imageUrl || ''} alt=""
                  onClick={()=> setDisplayImage(products[currentProductIndex].imageUrl)}
                  />
                </div>
                <div>
                  <p className="text-center text-lg font-medium py-1">{products[currentProductIndex].name || ''}</p>
                  <p className="overflow-y-auto max-h-60 text-gray-700">
                    {products[currentProductIndex].description || ''}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-green-600 font-medium text-base md:text-lg mt-1">₦
                    {thousandify(products[currentProductIndex].price || '')}</p>

                </div>
               </div>

                <div className="sticky" >
                    <button className="cursor-pointer mt-3 w-full bg-green-500 text-xs md:text-sm lg:text-base text-white py-1 md:py-2 rounded-4xl hover:bg-green-600 transition">
                     Add to Cart
                  </button>
                </div>


              </div>
            </div>

          </section>}
        {/* View Prouct Modal end  */}


         {loading && <div
            className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            >

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>}
      {/* // loader  */}
      <nav className="bg-gray-100 px-10 py-4 shadow fixed w-full">
       <div className="max-w-[1100px]  flex justify-between mx-auto">
         <h1 className="flex items-center md:text-xl">
          <div className='text-green-800'>
            <HiOutlineShoppingBag />
          </div>
          {store.storeName}
          </h1>
        <div className="flex items-center text-xl md:text-2xl relative ">
          <div className="text-xs w-4 h-4 flex items-center justify-center absolute bg-red-400 text-white rounded-3xl top-0 right-0 -mr-2">2</div>
          <FiShoppingCart />
          </div>
       </div>
      </nav>
      <div className="h-12"></div>

     {/* Store Info Hero  */}
      <div className="py-12  px-6 flex flex-col lg:flex-row mb-10 bg-green00 max-w-6xl mx-auto">
       <div>
         <h1 className="text-lg pb-3 md:text-3xl lg:text-2xl text-center lg:text-left">{store.storeName}</h1>
          <p className="md:mt-2 text-3xl md:text-5xl lg:text-6xl max-w-2xl mx-auto text-center lg:text-left">
            {store.storeBio}
          </p>
       </div>
        <div className=" rounde-4xl overflow-hidden w-fi mx-auto mt-10 lg:mt-0">
          <img src={store.storeLogo} alt="" className="w-100"/>
        </div>
          {/* <p className="mt-1 text-xs text-lg opacity-90">
          /{store.handle}
        </p> */}
      </div>
     {/* Store Info Hero end */}

      

   
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-2">
        
        {products.map((product, i) => (
          <div
            key={product._id}
            className="bg-white rounded-lg  border border-gray-300 transition overflow-hidden cursor-pointer"
            onClick={()=> {
              
              setCurrentProductIndex(i)
              setShowProductModal(true)
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 md:h-42 lg:h-48 object-cover"
              
            />
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm lg:text-base font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-green-600 font-medium text-sm md:text-base mt-1">₦
                {thousandify(product.price)}</p>
              <button className="cursor-pointer mt-3 w-full bg-gray-300/60 hover:text-white text-xs md:text-sm lg:text-base py-1 md:py-2 rounded-sm hover:bg-green-600 transition" onClick={(e)=> {
                e.stopPropagation()
                addToCart(i)
              }}>
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
