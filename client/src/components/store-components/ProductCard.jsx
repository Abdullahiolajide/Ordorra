import React from 'react'

const ProductCard = ({id, imageUrl, name,}) => {
  return (
    // <div
    //             key={id}
    //             className="bg-white rounded-xl hover:scale-105  borde border-gray-300 transition overflow-hidden "
               
    //           >
    //             <img
    //               src={imageUrl}
    //               alt={name}
    //               className="w-full h-32 md:h-42 lg:h-48 object-cover cursor-pointer"
    //                onClick={()=> {
                  
    //               setCurrentProductIndex(i)
    //               setShowProductModal(true)
    //             }}
                  
    //             />
    //             <div className="p-2 md:p-4">
    //               <h3 className="text-sm md:text-sm lg:text-base font-medium text-gray-800 cursor-pointer truncate"
    //                 onClick={()=> {
                  
    //               setCurrentProductIndex(i)
    //               setShowProductModal(true)
    //             }}
    //               >
    //                 {name}
    //               </h3>
    //               <p className="text-green-600 fo nt-medium text-sm md:text-base mt-1">₦
    //                 {thousandify(price)}</p>
    
    //               {!cartArray.find(cart=> cart.id == id)?.quantity ?
    //                <button className="cursor-pointer mt-3 w-full text-white hover:text-white text-sm md:text-sm lg:text-base py-2 md:py-2 rounded-sm bg-green-500 hover:bg-green-600 transition flex items-center justify-center " onClick={(e)=> {
    //                 e.stopPropagation()
    //                 addToCart(i, null)
    //               }}>
    //                 <MdAddShoppingCart className=" md:text-xl me-1 md:me-3"/>Add to Cart
    //               </button>
    //               :
    //               <div className="w-4/6 flex felx-col justify-between mt-3 mx-auto">
    //                 <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer"
    //                     onClick={(e)=>{
    //                       e.stopPropagation()
    //                       addToCart(i)
    //                     }}
    //                     >
    //                     + 
    //                 </button>
    
    //                 <div className="text-xs md:text-sm flex items-center justify-center">
    //                   {cartArray.find(cart=> cart.id == product._id)?.quantity}
    //                 </div>
    
    //                 <button className="w-8 h-8 md:h-9 md:w-9 text-xs p-2 rounded md:px-4 py-1 md:py-2 md:text-sm flex items-center justify-center bg-gray-300/60 hover:bg-green-600 hover:text-white cursor-pointer" 
    //                   onClick={(e)=>{
    //                     e.stopPropagation()
    //                     substractFromCart(i, null)
    //                   }}
    //                   >
    //                     - 
    //                 </button>
    //               </div>
    //               }
    //             </div>
            //   </div>
            <></>
  )
}

export default ProductCard