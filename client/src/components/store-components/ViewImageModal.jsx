import React from 'react'
import { IoIosClose } from 'react-icons/io'

const ViewImageModal = ({onClick, displayImage}) => {
  return (
    <div>
        {displayImage && 
          <div className="flex w-full h-full items-center justify-center absolute z-100 fixed bg-black/40 inset-0">
          <div className="w-full h-full absolute -z-1" onClick={onClick}></div>
           <div className="absolute right-2 top-2 text-4xl text-gray-300 hover:text-white-700 cursor-pointer" onClick={onClick}>
                          <IoIosClose />
                </div>
            <img src={displayImage} alt="" className="lg:max-h-150 lg:max-w-270 px-2 max-h-[80vh] py-2 lg:px-0" />
          </div>
          }
    </div>
  )
}

export default ViewImageModal