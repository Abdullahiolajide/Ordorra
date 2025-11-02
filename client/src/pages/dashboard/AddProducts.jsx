import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../../../global'
import { RefreshContext } from '../../components/DashboardLayout';

const AddProducts = ({productInfo = null}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    imagePublicId:''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null);
  
  const {setRefresh, pl, isSubscribed, setShowSModal} = useContext(RefreshContext)



  useEffect(()=>{
    if (productInfo) {
      setFormData(productInfo)
    }else{
      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        imagePublicId:''
      })
    }
  }, [productInfo])

  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData)

const uploadImageToCloudinary = async (file) => {

  try {
    setUploading(true);
    if (formData.imagePublicId){
      await axios.post(`${backendurl}/image/delete`, {public_id:formData.imagePublicId});
    }
    const res = await axios.get(`${backendurl}/image/sign`, {withCredentials: true})

    const data = new FormData();
    data.append('file', file);
    data.append("api_key", res.data.apiKey);
    data.append("timestamp", res.data.timestamp);
    data.append("signature", res.data.signature);
    data.append("folder", res.data.folder);
    const result = await axios.post('https://api.cloudinary.com/v1_1/dsr9rtryb/image/upload', data, { withCredentials: false } );
    
 
    setFormData(prev => ({ ...prev, imageUrl: result.data.secure_url, imagePublicId:result.data.public_id }));

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
      if (!isSubscribed && pl >= 4) {
        // console.log(isSubscribed)
        setShowSModal(true)
        return
      }

  const { name, price, description, imageUrl, imagePublicId } = formData;
  setSaving(true)
  if(productInfo){
    return updateProduct(productInfo._id, { name, price, description, imageUrl, imagePublicId })
  }

  if (!name || !price || !imageUrl) {
    return toast.info('All fields are required and image must be uploaded');
  }


  try {
    const res = await axios.post(
      `${backendurl}/products/create-product`, 
      { name, price, description, imageUrl, imagePublicId }
    );

    toast.success('Product created!');
    setRefresh(prev=> !prev)
    setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        imagePublicId:''
      })
      fileInputRef.current.value = null;
      if (window.gtag) {
                    window.gtag('event', 'added_product');
                }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Failed to create product');
  }
  finally{
    setSaving(false)

  }
};

    const updateProduct = async (id, updatedData) => {

      try {
        const res = await axios.put(`${backendurl}/products/update/${id}`, updatedData);

        toast.success('Product updated successfully');
        setRefresh(prev=> !prev)
        setFormData({
          name: '',
          price: '',
          description: '',
          imageUrl: '',
          imagePublicId:''
      })
      fileInputRef.current.value = null;
        return res.data; // updated product
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }finally{
        setSaving(false)
        
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
