import React from "react";
import { FaStore, FaUser, FaPalette, FaBell, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

      <div className="space-y-6">
        {/* Store Preferences
        <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaStore className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Store Preferences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Store Name</label>
              <input
                type="text"
                placeholder="Ex. My Awesome Store"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Currency</label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>₦ - Nigerian Naira</option>
                <option>$ - US Dollar</option>
                <option>€ - Euro</option>
              </select>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        {/* <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaUser className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Account Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Change Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </section> */}

        {/* Appearance */}
        {/* <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaPalette className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          <div>
            <label className="text-sm text-gray-600">Upload Logo</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </section> */}

        {/* Notifications */}
        {/* <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaBell className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-500" />
              <span>Email me when I get new orders</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-500" />
              <span>Notify me when stock is low</span>
            </label>
          </div>
        </section>  */}

        {/* Security */}
        <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <button className="cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={()=> {
            localStorage.removeItem('token')
            navigate('/signin', {replace: true})
          }}
              >
            Log Out 
          </button>
        </section>
        <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Subscription</h2>
          </div>
          <button className="cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={()=> {
            localStorage.removeItem('token')
            navigate('/signin', {replace: true})
          }}
              >
            Manage Subscription 
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
