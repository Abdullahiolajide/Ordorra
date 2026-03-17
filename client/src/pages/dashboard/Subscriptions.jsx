import React from 'react';
import { FaHeadset } from 'react-icons/fa6';

const Subscriptions = () => {
  return (
    <div className='min-h-[91vh] bg-gray-50 py-10 px-4'>
      <div className='max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-10'>
        <h1 className='text-2xl font-bold text-gray-800'>Support</h1>
        <p className='text-gray-600 mt-3'>
          This page used to manage subscriptions. Ordorra is now free, so billing is disabled.
        </p>
        <a
          href='mailto:support@ordorra.app'
          className='mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition'
        >
          <FaHeadset />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Subscriptions;
