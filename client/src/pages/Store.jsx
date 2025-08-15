import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendurl } from "../../global";
import { useParams } from "react-router-dom";
import thousandify from 'thousandify'
import { IoIosClose } from "react-icons/io";

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
      {/* View Image Modal  */}

        {/* View Prouct Modal  */}
          {showProductModal && <section>
            <div className={`fixed inset-0 z-50 px-2 md:px-0 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}>
              <div className="w-full h-full absolute -z-1" onClick={()=> setShowProductModal(false)}></div>
              <div className="bg-white w-100 max-h-170 rounded-2xl boder border-gray-300 relative px-4 py-4 flex flex-col justify-between">
                <div className="absolute right-2 top-2 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer" onClick={()=> setShowProductModal(false)}>
                          <IoIosClose />
                </div>

               <div>
                 <div className="mt-6 rounded-md overflow-hidden max-h-55">
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

     {/* Store Info Hero  */}
      <div className="bg-green-600 text-white py-5 lg:py-12 px-6 text-center">
        <div className=" rounded-4xl overflow-hidden w-fit mx-auto"><img src={store.storeLogo} alt="" className="w-35 h-35"/></div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium lg:font-bold">{store.storeName}</h1>
        <p className="mt-2 ">
          {store.storeBio}
        </p>
          <p className="mt-1 text-xs text-lg opacity-90">
          /{store.handle}
        </p>
      </div>
     {/* Store Info Hero  */}

      

   
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
              <button className="cursor-pointer mt-3 w-full bg-gray-300/60 hover:text-white text-xs md:text-sm lg:text-base py-1 md:py-2 rounded-sm hover:bg-green-600 transition" onClick={(e)=> e.stopPropagation()}>
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
