import React from 'react'

const CoverLoader = ({loading}) => {
 if (loading) return (
    //  {loading && 
         <div
            className={`fixed inset-0 z-110 bg-black/30 transition-opacity duration-300 opacity-100 flex items-center justify-center`}
            >

            <div className="h-13 w-13 border absolute border-5 rounded-4xl border-b-transparent border-green-600 animate-spin">

            </div>
      </div>
    //   }
  )
}

export default CoverLoader