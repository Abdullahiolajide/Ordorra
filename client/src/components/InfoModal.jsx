import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const InfoModal = ({showModal, setShowModal, title, content, actionText, action}) => {
 if(showModal){

     return (
         <div className="w-full  h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">
            <div className="w-[450px] mx-5 bg-white rounded-2xl shadow-lg p-6 relative">
                            <button
                              onClick={() => setShowModal(false)}
                              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                            >
                              <AiOutlineClose size={22} />
                            </button>
                            <h2 className="text-xl lg:text-2xl font-bold mb-3 text-gray-800">
                              {title}
                            </h2>
                    
                            {/* Message */}
                            <p className="text-gray-600 mb-5 leading-relaxed">
                              {content}
                            </p>
                            <div className='flex gap-3'>
                                <button 
                                onClick={action}
                                className='cursor-pointer bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition mt-3'>
                                    {actionText}
                                </button> 
                                <button 
                                onClick={()=> setShowModal(prev=> !prev)}
                                className='cursor-pointer bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition mt-3'>
                                    cancel
                                </button> 
    
    
                            </div>
                            
                          </div>
                        </div>
  )
}
}

export default InfoModal