import axios from 'axios'
import thousandify from 'thousandify'
import React, { useContext, useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { backendurl } from '../../../global'
import { IoIosClose } from 'react-icons/io'
import AddProducts from './AddProducts'
import { RefreshContext } from '../../components/DashboardLayout'
import { SlOptionsVertical } from 'react-icons/sl'

const Products = () => {
  const [userProducts, setUserProducts] = useState([])
  const [show, setShow] = useState(false)
  const [actions, setActions] = useState(null)
  const [productInfo, setProductInfo] = useState(null)
  const { refresh } = useContext(RefreshContext)

  useEffect(()=>{
    getProducts()
  }, [refresh])

    const getProducts = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const res = await axios.get(`${backendurl}/products/get-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(res.data, );
        setUserProducts(res.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const deleteProduct = async (productId) => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.delete(`${backendurl}/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        
        getProducts(); 
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };




  


  return (
    <div>
      {/* Backdrop  */}
       <div className={`backdrop fixed w-full h-[100dvh] bg-black/30 top-0 left-0 ${show ? 'block' : 'hidden'} duration-400`}onClick={()=> {
            setProductInfo(null)
            setShow(false)

          }}></div>


     <div className='text-3xl font-medium md:py-4 py-2'> Products</div>
     <div className='md:my-5 my-3 flex text-sm'>
      <input 
      type="text" 
      placeholder='Search Product'
      className='border py-1 px-2 rounded border-gray-300 w-full'
      />
      <button className='text-sm bg-green-500 text-white mx-2 py-1 md:px-4 px-2 w-fit whitespace-nowrap rounded flex items-center cursor-pointer' onClick={()=> setShow(true)}> <span className='text-2xl pr-1'><IoAddOutline /></span> Add Product</button>
     </div>

     <table className="w-full border border-gray-300 rounded-md text-sm md:text-base">
        <thead className='bg-gray-200'>
          <tr className="text-left">
            <th className="px-1 md:px-2 py-2 border-b border-gray-300 w-1">Id</th>
            <th className="px-1 md:px-2 py-2 border-b border-gray-300 w-1">Image</th>
            <th className="px-1 md:px-2 py-2 border-b border-gray-300 ">Name</th>
            <th className="px-1 md:px-2 py-2 border-b border-gray-300 w-1">Price(₦)</th>
            <th className="px-1 md:px-2 py-2 border-b border-gray-300 text-center w-1"></th>
          </tr>
        </thead>
        <tbody>
          {userProducts.map((product, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="px-1 md:px-2 py-1">{index + 1}</td>
              <td className="px-1 md:px-2 py-1"><img src={product.imageUrl} alt="" className='md:w-12 w-10' /></td>
              <td className="px-1 md:px-2 py-1">{product.name}</td>
              <td className="px-1 md:px-2 py-1">{thousandify(product.price)}</td>
              <td className="pr-2 md:px-2 py-1 text-center relative">
                <button className={`text-xl hover:bg-gray-400/30 rounded-4xl flex items-center justify-center w-6 h-6 cursor-pointer ${actions == index ? 'bg-gray-400/40' :''}`} onClick={()=> setActions(prev => prev == null ? index : null)}> 
                  <span className='text-sm '><SlOptionsVertical /></span> </button>


               {actions == index && <div className='absolute right-8 top-5 bg-white shadow-xl' onClick={()=> setActions(null)}>
                  <div className='border-b border-gray-300 py-2 px-10 cursor-pointer hover:bg-gray-400/30'
                  onClick={()=> {
                    setProductInfo(product)
                    setShow(true)
                  }}
                  >Edit</div>
                  <div className='px-10 py-2 text-red-400 cursor-pointer hover:bg-gray-400/30' onClick={()=> deleteProduct(product._id)}>Delete</div>
                </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <section className={`add-products fixed top-0 right-0 bg-white p-2 h-[100dvh] duration-300 w-full md:w-fit ${show ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='absolute right-0 p-4 text-4xl cursor-pointer' onClick={()=> {
            setProductInfo(null)
            setShow(false)

          }}><IoIosClose /></div>
          <AddProducts productInfo={productInfo} />
          <div className='flex justify-center'>
            <button className='w-5/6 mx-auto bg-gray-400/30 border border-gray-300 rounded py-2 mb-48 cursor-pointer'
            onClick={()=> {
            setProductInfo(null)
            setShow(false)

          }}
            >Cancel</button>
          </div>
        </section>

    </div>
  )
}

export default Products