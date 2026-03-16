import React, { useState } from 'react'
import { IoHelpCircleOutline } from 'react-icons/io5'
import InfoModal from './InfoModal'

const Help = () => {
    const [showModal, setShowModal] = useState(false)
    const sendToWhatsApp = ()=>{
        window.open("https://wa.me/2348165852818?text=Hi%20Ordorra%20Support,")
    }
  return (
    <div>
        <InfoModal 
            showModal={showModal}
            setShowModal={setShowModal}
            title={"Need Help?"}
            content={"Have questions, suggestions, or want to report a problem?"}
            actionText={"💚 Chat with us on WhatsApp"}
            action={sendToWhatsApp}
        />
        <div className='fixed bottom-20 lg:bottom-5 right-3 z-50 flex flex-col justify-end items-end gap-1 cursor-pointer' 
    onClick={()=> setShowModal(true)}>
        <div className='bg-white rounded-full border text-xs border-gray-500 px-2 py-1'>Need Help?</div>
       <div className='bg-green-500 p-2 rounded-full text-white w-fit right-0'><IoHelpCircleOutline className='text-3xl' /></div>
    </div>
    </div>
  )
}

export default Help