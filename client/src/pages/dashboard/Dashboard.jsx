import React, { useState } from 'react'
import AddProducts from './AddProducts'
import { IoIosClose } from 'react-icons/io'

const Dashboard = () => {
  const [show, setShow] = useState(false)
  return (
    <div>
      {/* backdrop */}
      <div className={`backdrop fixed w-full h-[100dvh] bg-black/30 top-0 left-0 ${show ? 'block' : 'hidden'} duration-400`} onClick={()=> setShow(false)}></div>
      {/* backdrop */}



        <section className='my-1'>
          <h1 className='text-xl mb-2'>Dashboard</h1>
          <button className='bg-green-500 text-white rounded px-4 py-2 cursor-pointer' onClick={()=> setShow(true)}>Add Product</button>
        </section>






      {/* Add Product Modal  */}
        <section className={`add-products fixed top-0 right-0 bg-white p-2 h-[100dvh] duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='absolute right-0 p-4 text-4xl cursor-pointer' onClick={()=> setShow(false)}><IoIosClose /></div>
          <AddProducts />
        </section>

      {/* Add Product Modal  */}

    </div>
  )
}

export default Dashboard