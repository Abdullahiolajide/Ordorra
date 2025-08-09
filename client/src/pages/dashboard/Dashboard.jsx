import React, { useState } from 'react'
import AddProducts from './AddProducts'
import { IoIosClose } from 'react-icons/io'

const Dashboard = () => {
  const [show, setShow] = useState(false)
  return (
  <div className="min-h-[100dvh] bg-gray-50 p-4 md:p-8">
    {/* Backdrop */}
    <div
      className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setShow(false)}
    ></div>

    {/* Header */}
    <section className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <button
        className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-4 py-2 shadow transition"
        onClick={() => setShow(true)}
      >
        <span className="text-lg">+</span> Add Product
      </button>
    </section>

    {/* Empty State */}
    <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 3h18M9 3v18m6-18v18M3 9h18m-9 0v12"
        />
      </svg>
      <p className="text-lg font-medium">No products yet</p>
      <p className="text-sm">Click the button above to add your first product.</p>
    </div>

    {/* Add Product Modal */}
    <section
      className={`fixed top-0 right-0 bg-white p-4 md:p-6 h-[100dvh] w-full md:w-[400px] shadow-xl transform transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute right-4 top-4 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => setShow(false)}
      >
        <IoIosClose />
      </div>
      <AddProducts />
      <div className="flex justify-center">
        <button
          className="w-5/6 mx-auto bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded py-2 mt-4 transition"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
      </div>
    </section>
  </div>
);

}

export default Dashboard