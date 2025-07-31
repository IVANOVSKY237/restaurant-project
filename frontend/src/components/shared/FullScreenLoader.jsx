import React from 'react'

const FullScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default FullScreenLoader
