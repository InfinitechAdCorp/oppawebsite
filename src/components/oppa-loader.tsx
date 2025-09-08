"use client"

import { useState, useEffect } from "react"

export default function OppaLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="relative">
            {/* Main Wok with 3D effect */}
            <div className="w-40 h-20 mx-auto relative">
              {/* Wok shadow */}
              <div className="absolute inset-0 bg-black/20 rounded-full blur-sm transform translate-y-2"></div>

              {/* Main wok body */}
              <div className="relative w-full h-full bg-gradient-to-b from-gray-700 via-gray-800 to-black rounded-full shadow-2xl border-2 border-gray-600">
                {/* Wok rim highlight */}
                <div className="absolute top-0 inset-x-2 h-2 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 rounded-full opacity-60"></div>

                {/* Enhanced wooden handles */}
                <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-16 h-3 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-800 rounded-full shadow-lg border border-amber-800"></div>
                <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-16 h-3 bg-gradient-to-l from-amber-900 via-amber-700 to-amber-800 rounded-full shadow-lg border border-amber-800"></div>

                <div className="absolute inset-3 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full animate-pulse opacity-90 shadow-inner">
                  {/* Oil bubbles */}
                  <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-200 rounded-full animate-ping opacity-80"></div>
                  <div className="absolute top-3 right-6 w-1 h-1 bg-orange-200 rounded-full animate-ping delay-200 opacity-70"></div>
                  <div className="absolute bottom-3 left-6 w-1 h-1 bg-red-200 rounded-full animate-ping delay-400 opacity-75"></div>
                  <div className="absolute bottom-2 right-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-100 opacity-85"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-90"></div>
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping delay-75 ml-3 opacity-80"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full animate-ping delay-150 -ml-6 opacity-85"></div>
                  <div className="w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-300 ml-2 opacity-75"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Main smoke trails */}
                <div className="absolute left-0 w-4 h-16 bg-gradient-to-t from-gray-400/80 via-gray-300/60 to-transparent rounded-full animate-pulse transform rotate-2 origin-bottom"></div>
                <div className="absolute left-2 w-3 h-14 bg-gradient-to-t from-gray-300/70 via-gray-200/50 to-transparent rounded-full animate-pulse delay-200 transform -rotate-1 origin-bottom"></div>
                <div className="absolute left-4 w-4 h-15 bg-gradient-to-t from-gray-400/75 via-gray-300/55 to-transparent rounded-full animate-pulse delay-400 transform rotate-3 origin-bottom"></div>

                {/* Secondary smoke wisps */}
                <div className="absolute -left-1 top-2 w-2 h-10 bg-gradient-to-t from-gray-200/60 to-transparent rounded-full animate-pulse delay-100 transform rotate-1 origin-bottom"></div>
                <div className="absolute left-6 top-1 w-2 h-12 bg-gradient-to-t from-gray-300/50 to-transparent rounded-full animate-pulse delay-300 transform -rotate-2 origin-bottom"></div>

                {/* Floating smoke particles */}
                <div className="absolute left-1 -top-2 w-1 h-1 bg-gray-300 rounded-full animate-ping delay-500 opacity-60"></div>
                <div className="absolute left-5 -top-1 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-700 opacity-50"></div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1 items-end">
                <div className="w-5 h-10 bg-gradient-to-t from-red-700 via-orange-500 to-yellow-400 rounded-full animate-pulse transform rotate-3 origin-bottom shadow-lg"></div>
                <div className="w-4 h-8 bg-gradient-to-t from-orange-700 via-yellow-500 to-yellow-300 rounded-full animate-pulse delay-100 transform -rotate-2 origin-bottom shadow-md"></div>
                <div className="w-6 h-12 bg-gradient-to-t from-red-600 via-orange-400 to-yellow-300 rounded-full animate-pulse delay-200 transform rotate-1 origin-bottom shadow-lg"></div>
                <div className="w-4 h-7 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-200 rounded-full animate-pulse delay-300 transform -rotate-3 origin-bottom shadow-md"></div>
                <div className="w-5 h-9 bg-gradient-to-t from-red-700 via-orange-500 to-yellow-400 rounded-full animate-pulse delay-150 transform rotate-2 origin-bottom shadow-lg"></div>
              </div>

              {/* Flame base glow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent rounded-full blur-sm"></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse drop-shadow-lg">
            OPPA
          </h1>
          <p className="text-xl text-gray-700 mt-2 font-medium tracking-wide">Korean Restaurant</p>
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-bounce delay-100 shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-bounce delay-200 shadow-lg"></div>
        </div>

        <p className="text-base text-gray-600 mt-6 animate-pulse font-medium">Cooking up something delicious...</p>
      </div>
    </div>
  )
}
