import React from 'react'
import Icon from './Icon'

const CoverLoader = ({loading}) => {
 if (loading) return (
    //  {loading && 
         <div
            className={`fixed inset-0 z-110 bg-white transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            > 

            <div className='flex items-center text-xl md:text-3xl font-bold text-gray-700 mb-30'><Icon /> Ordorra</div>

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>
    //   }
  )
}

export default CoverLoader