import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../../../global';

const StoreInfo = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    whatsappNumber: '',
    phoneNumber: '',
    storeName: '',
    handle: '',
    storeBio: '',
    storeLogo: ''
  });
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStoreInfo = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${backendurl}/store/info`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data) {
          setFormData(res.data);
          setIsEditing(true);
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error('Error fetching store info:', err.response?.data || err.message);
          toast.error('Failed to fetch store information.');
        }
      }
      finally{
        setLoading(false)
      }
    };

    fetchStoreInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'storeLogo' && files[0]) {
      uploadImage(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ordorra_unsigned');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dsr9rtryb/image/upload',
        { method: 'POST', body: data }
      );
      const imgData = await res.json();
      setFormData((prev) => ({ ...prev, storeLogo: imgData.secure_url }));
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true)
    
    try {
      const token = localStorage.getItem('token');
      const method = isEditing ? 'put' : 'post';
      await axios[method](
        `${backendurl}/store/info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setSaving(false)
      toast.success(`Store information ${isEditing ? 'updated' : 'saved'} successfully!`);
    } catch (err) {
      console.error('Error saving store info:', err.response?.data || err.message);
      toast.error('Failed to save store information.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto md:p-6">
       {loading && <div
            className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            >

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>}
      <h2 className="text-3xl font-bold mb-8 mt-4 text-gray-800">Store Information</h2>
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Left: Polished Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg px-4 py-8 md:p-8 border border-gray-100 space-y-6"
        >
          {/* Section: Personal Info */}
          <div className="pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Ex. Ige Abdullahi Olajide"
                  required
                  className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Ex. 09039848284"
                  required
                  className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Section: Contact */}
          <div className="pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact</h3>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Ex. 09039848284"
              required
              className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Section: Store Info */}
          <div className="pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Store details</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Store name</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Ex. Your Highnesse's Wears"
                required
                className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
              <label className="block text-sm font-medium text-gray-600 mb-1">Handle</label>
              <input
                type="text"
                name="handle"
                value={formData.handle}
                onChange={handleChange}
                placeholder="Ex. your-highnesses-wears"
                required
                disabled={isEditing}
                className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-60 transition"
              />
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                name="storeBio"
                value={formData.storeBio}
                onChange={handleChange}
                placeholder="Ex. Everything you need just an order away"
                rows="3"
                className="w-full bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
          </div>

         
            {/* store logo  */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Store Logo</h3>
         <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo (optional)</label>
           <input
             type="file"
           name="storeLogo"
           onChange={handleChange}
           accept="image/*"
           className="cursor-pointer file:cursor-pointer block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
           {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
           {formData.storeLogo && (
             <div className="mt-3">
               <img
                 src={formData.storeLogo}
                 alt="Store Logo Preview"
                 className="h-16 w-16 object-cover rounded-full border border-green-300"
                 />
             </div>
           )}
         </div>
           {/* store logo  */}

          {/* Save Button */}
          <button
            type="submit"
            disabled={uploading || saving}
            className="cursor-pointer w-full bg-green-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition disabled:bg-green-300"
          >
            {isEditing ? 'Update Store Info' : 'Save Store Info'}{saving && '...'}
          </button>
        </form>

        {/* Store Preview*/}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center h-fit sticky top-3">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm mb-5">
            {formData.storeLogo ? (
              <img
                src={formData.storeLogo}
                alt="Logo Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                Logo
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{formData.storeName || 'Store Name'}</h3>
          <p className="text-gray-500 text-sm mb-3">@{formData.handle || 'handle'}</p>
          <p className="text-gray-600 leading-relaxed">{formData.storeBio || 'Your store bio will appear here.'}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;

