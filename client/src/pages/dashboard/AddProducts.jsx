import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../../../global';
import thousandify from 'thousandify'
import { RefreshContext } from '../../components/DashboardLayout';

const AddProducts = ({productInfo = null}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null);
  const {setRefresh} = useContext(RefreshContext)

  useEffect(()=>{
    if (productInfo) {
      setFormData(productInfo)
    }else{
      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
      })
    }
  }, [productInfo])
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'ordorra_unsigned'); 

  setUploading(true);
  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dsr9rtryb/image/upload',
      data
    );
    setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
  } catch (err) {
    console.error(err);
    toast.error('Image upload failed');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  } finally {
    setUploading(false);
  }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, price, description, imageUrl } = formData;
  setSaving(true)
  if(productInfo){
    return updateProduct(productInfo._id, { name, price, description, imageUrl })
  }

  if (!name || !price || !description || !imageUrl) {
    return toast.info('All fields are required and image must be uploaded');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return toast.error('User not authenticated');
  }

  try {
    const res = await axios.post(
      `${backendurl}/products/create-product`, // Replace with your backend URL
      { name, price, description, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success('Product created!');
    setRefresh(prev=> !prev)
    setFormData({
      name: '',
        price: '',
        description: '',
        imageUrl: '',
      })
      fileInputRef.current.value = null;
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Failed to create product');
  }
  finally{
    setSaving(false)

  }
};

    const updateProduct = async (id, updatedData) => {
      const token = localStorage.getItem('token'); // or however you're storing it

      try {
        const res = await axios.put(`${backendurl}/products/update/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success('Product updated successfully');
        setSaving(false)
        setRefresh(prev=> !prev)
        setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
      })
      fileInputRef.current.value = null;
        return res.data; // updated product
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    };


return (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl ">
    <h2 className="text-2xl font-bold mb-2 md:mb-4 text-gray-900">
      {productInfo ? 'Edit Product' : 'Add New Product'}
    </h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Ex. Sneakers for men"
          className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Price (₦)
        </label>
        <input
          type="number"
          name="price"
          placeholder="Ex. 30000"
          className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={handleChange}
          value={formData.price}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Description <span className="text-xs text-gray-500">(optional)</span>
        </label>
        <textarea
          name="description"
          rows="4"
          className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={handleChange}
          value={formData.description}
        ></textarea>
      </div>

      {/* Product Image */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer transition"
          required={!productInfo}
        />
        {uploading && (
          <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading || saving}
        className="cursor-pointer w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  </div>
);

};

export default AddProducts;
