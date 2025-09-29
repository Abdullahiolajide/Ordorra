import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { backendurl } from "../../global";
import { useParams } from "react-router-dom";
import thousandify from 'thousandify'
import { IoIosClose } from "react-icons/io";
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiShoppingCart } from "react-icons/fi";
import { FaTrash, FaWhatsapp } from "react-icons/fa";
import { CiAirportSign1 } from "react-icons/ci";
import { MdAddShoppingCart } from "react-icons/md";

const Store = () => {
  const params = useParams()
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState({})
  const [showProductModal, setShowProductModal] = useState(false)
  const [displayImage, setDisplayImage] = useState('')
  const [store, setStore] = useState({})
  const [loading, setLoading] = useState(false)
  const [cartArray, setCartArray] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [totalPrice, setTodalPrice] = useState(0)
  


      const getStore = useCallback(async () => {
        setLoading(true)
        try {
          const res = await axios.get(`${backendurl}/store/info/${params.handle}`)
          setProducts(res.data.products)
          setStore(res.data.store)
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message)
          } else {
            console.error(error.message)
          }
        } finally {
          setLoading(false)
        }
      }, [backendurl, params.handle]) 

      useEffect(()=>{
        getStore()
      }, [])
      useEffect(() => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartArray(JSON.parse(savedCart))
      }
    }, [])
    useEffect(()=>{
       let total = 0
       const ac = cartArray.filter(cart=> cart.ownerId == store.user)
      if (ac.length > 0){
        for (let i = 0; i < ac.length; i++) {
          total += ac[i].price * ac[i].quantity
          
        }
        setTodalPrice(total)
      }else{
        setTodalPrice(0)
      }
    }, [cartArray])



    const addToCart = (i, ci) => {
      setCartArray(prev => {
        let currentCart = [...prev]
        let productIndex = ci !== null && ci !== undefined && ci > -1 ? ci : currentCart.findIndex(item => item.id === products[i]._id)

        if (productIndex !== -1) {
          currentCart[productIndex].quantity += 1
        } else {
          currentCart.push({
            ownerId: products[i]?.ownerId,
            id: products[i]?._id,
            price: products[i]?.price,
            quantity: 1
          })
        }
        localStorage.setItem('cart', JSON.stringify(currentCart))

        return currentCart
      })
      setShowCart(true)
    }

    const substractFromCart =(i, ci)=>{
      setCartArray(prev => {
        let currentCart = [...prev]
        let productIndex = ci !== null && ci !== undefined && ci > -1 ? ci : currentCart.findIndex(item => item.id === products[i]._id)

        if (productIndex !== -1) {
          currentCart[productIndex].quantity -= 1
          if(currentCart[productIndex].quantity < 1){
            currentCart.splice(productIndex, 1)
          }

        } else {
        return null
        }
        localStorage.setItem('cart', JSON.stringify(currentCart))
        return currentCart
      })

    }

    const removeFromCart =(ci)=>{
      setCartArray(prev => {
        let currentCart = [...prev]
        currentCart.splice(ci, 1)
        localStorage.setItem('cart', JSON.stringify(currentCart))
        return currentCart
      })

    }

   const orderOnWhatsApp = () => {
      if (!store.phoneNumber) return

      //Cary Summary
      let message = `Hello ${store.storeName},\nI would like to order:\n\n`
      cartArray.forEach(item => {
        const product = products.find(p => p._id === item.id)
        if (product) {
          message += `• ${product.name} (x${item.quantity}) - ₦${thousandify(item.price * item.quantity)}\n`
        }
      })

      const total = cartArray.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      message += `\nTotal: ₦${thousandify(total)}\n\nPlease confirm availability.`

      const encoded = encodeURIComponent(message)

      // Phone number formattign 
      let phone = store.phoneNumber.trim().replace(/\D/g, "")
      if (phone.startsWith("0")) {
        phone = "234" + phone.slice(1)
      } else if (phone.startsWith("+")) {
        phone = phone.slice(1)
      } else if (!phone.startsWith("234")) {
        phone = "234" + phone
      }
    
      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank")
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
                    {/* <button className="cursor-pointer mt-3 w-full bg-green-500 text-xs md:text-sm lg:text-base text-white py-2 md:py-2 rounded-4xl hover:bg-green-600 transition">
                     Add to Cart
                  </button> */}
                {!cartArray.find(cart=> cart.id == products[currentProductIndex]._id)?.quantity ?
               <button className="cursor-pointer mt-3 w-full bg-gray-300/60 hover:text-white md:text-sm lg:text-base py-2 md:py-2 rounded-sm hover:bg-green-600 transition" onClick={(e)=> {
                e.stopPropagation()
                addToCart(currentProductIndex, null)
              }}>
                Add to Cart
              </button>
              :
              <div className="w-4/6 flex felx-col justify-between mt-3 mx-auto">
                <button className="w-8 h-8 md:h-9 md:w-9  p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer"
                    onClick={(e)=>{
                      e.stopPropagation()
                      addToCart(currentProductIndex)
                    }}
                    >
                    + 
                </button>

                <div className=" md:text-sm flex items-center justify-center">
                  {cartArray.find(cart=> cart.id == products[currentProductIndex]._id)?.quantity}
                </div>

                <button className="w-8 h-8 md:h-9 md:w-9 p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer" 
                  onClick={(e)=>{
                    e.stopPropagation()
                    substractFromCart(currentProductIndex, null)
                  }}
                  >
                    - 
                </button>
              </div>
              }
              </div>
                


              </div>
            </div>

          </section>}
        {/* View Prouct Modal end  */}

      {/* loader  */}
         {loading && <div
            className={`fixed inset-0 z-110 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            >

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>}
      {/* loader  */}



        {/* backdrop  */}
      {showCart && 
          <div className="bg-black/40 h-[100vh] fixed w-full" 
          onClick={() => setShowCart(prev=> !prev)}
          
          />
      }
   
          {/* Slider  */}

          <main className={`overflow-y-auto w-full h-[100dvh] fixed top-0 z-100 bg-white md:max-w-sm w-full absolute top-0 right-0 shadow-2xl flex flex-col duration-300 transition-transform ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <header className="flex items-center justify-between p-5 border-b border-gray-300 sticky top-0 bg-white w-full">
              <h2 className="text-lg font-semibold">Your Cart</h2>
                    <div
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-3xl cursor-pointer transition"
                      onClick={() => {
                        setShowCart(prev=> !prev)
                          }}
                        >
                      <IoIosClose />
                    </div>
            </header>

            {
          
              // cartArray.map((cart, ci)=>{
              cartArray.filter(cart=> cart.ownerId == store.user).map((cart, ci)=>{
                let cartProduct = products.find(product=> product._id == cart.id)
                console.log(store)
                console.log(cartArray)
                return(
                // {/* Cart Items */}
                <div className="px-5 py-3 space-y-4" key={cart.id}>
                  <div className="flex items-center gap-4 border-b border-gray-300 pb-3">
                    <img
                      src={cartProduct?.imageUrl}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{cartProduct?.name}</h3>
                      <p className="text-sm text-gray-500">₦{thousandify(cartProduct?.price)}</p>
                      <div className="flex items-center gap-2 mt-1">

                        <div className="w-4/6 flex felx-col justify-between mt-3">
                          <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer"
                              onClick={()=>{
                                addToCart(null, ci)
                              }}
                              >
                              + 
                          </button>

                          <div className="text-xs md:text-sm flex items-center justify-center">
                            {cart.quantity}
                          </div>

                          <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer" 
                            onClick={()=>{
                              substractFromCart(null, ci)
                            }}
                            >
                              - 
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={()=> removeFromCart(ci)}><FaTrash /></button>
                  </div>
                </div>

                )
              })
            }

            {cartArray.filter(cart=> cart.ownerId == store.user).length < 1 &&
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col justify-center space-y-3">
                  <p className="text-xl text-gray-400">Your cart is empty</p>
                  <button className="py-2 px-4 bg-green-600 text-white rounded cursor-pointer mx-auto"
                  onClick={() => {
                        setShowCart(prev=> !prev)
                          }}
                  >
                    Shop
                  </button>
                </div>
              </div>
            }


            {/* Checkout */}
            <footer className="px-5 py-4 border-t border-gray-300 sticky bottom-0 mt-auto bg-white w-full">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-gray-800">Total</span>
                <span className="font-semibold text-gray-800">₦{thousandify(totalPrice)}</span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 flex items-center justify-center rounded-lg font-medium cursor-pointer" onClick={orderOnWhatsApp}>
                <FaWhatsapp className="text-2xl me-2"/><span>Order on WhatsApp</span>
              </button>
            </footer>
          </main>
        



      <nav className="z-10 bg-white/80 backdrop-blur-md px-10 py-4 shadow-sm fixed w-full">
        <div className="max-w-[1100px] flex justify-between items-center mx-auto">
          <h1 className="flex items-center gap-2 font-semibold text-lg md:text-xl text-green-900">
            {/* <HiOutlineShoppingBag className="text-green-700 text-xl" /> */}
            <div className="w-10 h-10 rounded-3xl border overflow-hidden">
              <img src={store.storeLogo} alt="" className="w-10" />
            </div>
            {store.storeName}
          </h1>
          <button className="relative flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-3xl" 
          onClick={()=> setShowCart(prev=> !prev)}>
            <FiShoppingCart className="text-2xl" />
            
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                {cartArray.filter(cart=> cart.ownerId == store.user).length}
              </div>
          </button>
        </div>
      </nav>
      <div className="h-18"></div>

        {/* Store Hero */}
        {/* <div className="py-12 px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 mb-12 mx-auto  bg-red-500"> */}
        <div className="py-40 relative overflow-hidden">
          {/* Text */}
          {/* <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{store.storeName}</h1>
            <p className="mt-4 text-xl md:text-2xl lg:text-3xl text-gray-700 leading-snug">
              {store.storeBio}
            </p>
          </div> */}
          <img src={store.storeLogo} alt="" className="absolute top-0 h-ful top-0 w-full"/>
          <div className="absolute w-full h-full bg-black/60 top-0 "></div>
          <p className="absolute flex w-full h-full items-center justify-center top-0 lg:text-4xl md:text-3xl text-2xl font-medium text-white text-center">{store.storeBio || "Welcome"}</p>

          {/* Logo */}
          {/* <div className="flex-1 flex justify-center lg:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-lg w-40 h-40 flex items-center justify-center bg-gray-50">
              <img src={store.storeLogo} alt="" className="w-full h-full object-contain" />
            </div>
          </div> */}
        </div>


      

            <div className="max-w-6xl mx-auto px-6 lg:text-3xl md:text-2xl text-xl mt-10">Feaured Products</div>
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-2">
        
        {products.map((product, i) => (
          <div
            key={product._id}
            className="bg-white rounded-xl hover:scale-105  borde border-gray-300 transition overflow-hidden "
           
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 md:h-42 lg:h-48 object-cover cursor-pointer"
               onClick={()=> {
              
              setCurrentProductIndex(i)
              setShowProductModal(true)
            }}
              
            />
            <div className="p-2 md:p-4">
              <h3 className="text-sm md:text-sm lg:text-base font-medium text-gray-800 cursor-pointer"
                onClick={()=> {
              
              setCurrentProductIndex(i)
              setShowProductModal(true)
            }}
              >
                {product.name}
              </h3>
              <p className="text-green-600 fo nt-medium text-sm md:text-base mt-1">₦
                {thousandify(product.price)}</p>

              {!cartArray.find(cart=> cart.id == product._id)?.quantity ?
               <button className="cursor-pointer mt-3 w-full text-white hover:text-white text-sm md:text-sm lg:text-base py-2 md:py-2 rounded-sm bg-green-500 hover:bg-green-600 transition flex items-center justify-center " onClick={(e)=> {
                e.stopPropagation()
                addToCart(i, null)
              }}>
                <MdAddShoppingCart className=" md:text-xl me-1 md:me-3"/>Add to Cart
              </button>
              :
              <div className="w-4/6 flex felx-col justify-between mt-3 mx-auto">
                <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer"
                    onClick={(e)=>{
                      e.stopPropagation()
                      addToCart(i)
                    }}
                    >
                    + 
                </button>

                <div className="text-xs md:text-sm flex items-center justify-center">
                  {cartArray.find(cart=> cart.id == product._id)?.quantity}
                </div>

                <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer" 
                  onClick={(e)=>{
                    e.stopPropagation()
                    substractFromCart(i, null)
                  }}
                  >
                    - 
                </button>
              </div>
              }
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Store;
