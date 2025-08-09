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
  const [isEditing, setIsEditing] = useState(false); // detect edit mode

  useEffect(() => {
    const fetchStoreInfo = async () => {
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

    try {
      const token = localStorage.getItem('token');
      const method = isEditing ? 'put' : 'post';
      const res = await axios[method](
        `${backendurl}/store/info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Store info saved:', res.data);
      toast.success(`Store information ${isEditing ? 'updated' : 'saved'} successfully!`);
    } catch (err) {
      console.error('Error saving store info:', err.response?.data || err.message);
      toast.error('Failed to save store information.');
    }
  };

  return (
  <div className="max-w-2xl mx-auto p-6 rounded-md lg:border border-gray-200">
    <h2 className="text-xl font-bold mb-4">Store Information</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Full Name */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Full Name</label>
        <input
          type="text"
          name="fullname"
          placeholder='Ex. Ige Abdullahi Olajide'
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* WhatsApp Number */}
      <div>
        <label className="block font-medium text-sm text-gray-800">WhatsApp Number</label>
        <input
          type="tel"
          name="whatsappNumber"
          placeholder='Ex. 09039848284'
          value={formData.whatsappNumber}
          onChange={handleChange}
          required
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder='Ex. 09039848284'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Store Name */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Store Name</label>
        <input
          type="text"
          name="storeName"
          placeholder="Ex. Your Highnesse's wears"
          value={formData.storeName}
          onChange={handleChange}
          required
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Store Handle */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Store Handle (unique)</label>
        <input
          type="text"
          name="handle"
          placeholder='Ex. your-hignesses-wears'
          value={formData.handle}
          onChange={handleChange}
          required
          disabled={isEditing}
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Store Bio */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Store Bio</label>
        <textarea
          name="storeBio"
          placeholder='Ex. Everything you need just an order away'
          value={formData.storeBio}
          onChange={handleChange}
          rows="3"
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Store Logo */}
      <div>
        <label className="block font-medium text-sm text-gray-800">Store Logo (optional)</label>
        <input
          type="file"
          name="storeLogo"
          onChange={handleChange}
          accept="image/*"
          className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {formData.storeLogo && (
          <img
            src={formData.storeLogo}
            alt="Store Logo Preview"
            className="mt-2 h-16 object-contain border border-green-600 rounded"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
      >
        {isEditing ? 'Update Store Info' : 'Save Store Info'}
      </button>
    </form>
  </div>
);

};

export default StoreInfo;
