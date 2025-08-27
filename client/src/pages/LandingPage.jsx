import React from 'react'
import { FaStore, FaShieldAlt, FaGlobe } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { HiMiniLink } from 'react-icons/hi2'
import { LuMessageCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className='overflow-y-hidden'>
        <div className='h-[90dvh] flex flex-col items-center'>
          <h1 className='text-5xl mx-2 md:text-6xl font-medium max-w-4xl text-center mt-20 md:mt-24'>
            Create your store on WhatsApp with ease
          </h1>
          <h3 className='text-center max-w-4xl md:text-xl my-4 mx-4'>
            Build a simple online storefront and manage your orders right from WhatsApp
          </h3>
          <div>
            <Link to={'/signup'}>
              <button className='rounded-md bg-green-800 text-white px-4 py-2 hover:bg-green-700 duration-150 cursor-pointer'>
                Get Started
              </button>
            </Link>
          </div>

          <div>
            <img src="images/whatsappm.png" alt="" className='w-100' />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <div className='mb-40'>
        <h2 className='text-center text-3xl md:text-4xl mt-10'>How it works</h2>
        <p className='text-center my-5 px-4'>Here are three easy steps to get started with your online store</p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 w-fit mx-auto gap-7 mt-10'>
          <div className='h-fit hover:bg-gray-200/50 duration-300 text-center flex flex-col items-center border border-green-500 bg-gray-100/30 rounded-lg py-9 px-6'>
            <div className='text-xl text-green-400'><FiUpload /></div>
            <p className='text-lg font-medium mt-5'>Upload your Products</p>
            <p className='w-60 my-2'>Add products easily from your dashboard</p>
          </div>

          <div className='h-fit hover:bg-gray-200/50 duration-300 text-center flex flex-col items-center border border-green-500 bg-gray-100/30 rounded-lg py-9 px-6'>
            <div className='text-2xl text-green-400'><HiMiniLink /></div>
            <p className='text-lg font-medium mt-5'>Share your link</p>
            <p className='w-60 my-2'>Send your link to customers on social media</p>
          </div>

          <div className='h-fit hover:bg-gray-200/50 duration-300 text-center flex flex-col items-center border border-green-500 bg-gray-100/30 rounded-lg py-9 px-6'>
            <div className='text-xl text-green-400'><LuMessageCircle /></div>
            <p className='text-lg font-medium mt-5'>Get Orders on WhatsApp</p>
            <p className='w-60 my-2'>Customer orders come straight to your WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='mb-40 px-4'>
        <h2 className='text-center text-3xl md:text-4xl'>Why use Ordorra?</h2>
        <p className='text-center my-5'>More than just a link, Ordorra makes selling simple</p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto mt-10'>
          <div className='p-8 border border-green-500 rounded-lg bg-gray-100/30 hover:bg-gray-200/50 text-center'>
            <FaStore className='mx-auto text-2xl mb-4 text-green-400' />
            <h3 className='font-medium text-lg mb-2'>Instant Storefront</h3>
            <p>Create a clean storefront without con your own in minutes</p>
          </div>
          <div className='p-8 border border-green-500 rounded-lg bg-gray-100/30 hover:bg-gray-200/50 text-center'>
            <FaGlobe className='mx-auto text-2xl mb-4 text-green-400' />
            <h3 className='font-medium text-lg mb-2'>Custom Link</h3>
            <p>Get a unique subdomain like <span className='italic'>ordorra.com/store/mystore</span></p>
          </div>
          <div className='p-8 border border-green-500 rounded-lg bg-gray-100/30 hover:bg-gray-200/50 text-center'>
            <FaShieldAlt className='mx-auto text-2xl mb-4 text-green-400' />
            <h3 className='font-medium text-lg mb-2'>Safe & Reliable</h3>
            <p>Your data and store remain secure on our platform</p>
          </div>
        </div>
      </div>

      {/* Pricing teaser */}
      <div className='mb-40 text-center px-4'>
        <h2 className='text-3xl md:text-4xl'>Start Free, Grow with Us</h2>
        <p className='my-5 max-w-2xl mx-auto'>
          Begin with our free plan and explore Ordorra’s features. 
          Premium plans coming soon to help scale your business.
        </p>
        <Link to={'/signup'}>
          <button className='rounded-md bg-green-800 text-white px-6 py-3 hover:bg-green-700 duration-150 cursor-pointer'>
            Get Started Free
          </button>
        </Link>
      </div>

      {/* FAQ */}
      <div className='mb-40 px-4 max-w-4xl mx-auto'>
        <h2 className='text-center text-3xl md:text-4xl'>Frequently Asked Questions</h2>
        <div className='mt-8 space-y-6'>
          <div>
            <h3 className='font-medium'>Do I need a website to use Ordorra?</h3>
            <p className='text-gray-600'>No, Ordorra creates your storefront for you. All you need is WhatsApp.</p>
          </div>
          <div>
            <h3 className='font-medium'>How do customers order?</h3>
            <p className='text-gray-600'>They visit your link, add products to their cart, and checkout via WhatsApp.</p>
          </div>
          <div>
            <h3 className='font-medium'>Is Ordorra free?</h3>
            <p className='text-gray-600'>Yes, our free plan is available. Paid plans with advanced features are coming soon.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-10'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6'>
          <div>
            <h3 className='text-xl font-semibold mb-3'>Ordorra</h3>
            <p className='text-gray-400 text-sm'>Your WhatsApp storefront made simple.</p>
          </div>
          <div>
            <h3 className='font-medium mb-3'>Quick Links</h3>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li><Link to='/features'>Features</Link></li>
              <li><Link to='/pricing'>Pricing</Link></li>
              <li><Link to='/faq'>FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className='font-medium mb-3'>Legal</h3>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li><Link to='/terms'>Terms & Conditions</Link></li>
              <li><Link to='/privacy'>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <p className='text-center text-gray-500 text-sm mt-6'>
          © {new Date().getFullYear()} Ordorra. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
