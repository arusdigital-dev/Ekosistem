import React, { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

const Navbar = () => {
  const [isEkosistemOpen, setIsEkosistemOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-10 py-3 bg-[#F3F4F6] backdrop-blur-sm rounded-full my-3 max-w-6xl mx-auto">
      {/* Logo */}
      <div className="bg-blue-800 text-white px-6 py-2 rounded-full font-inter font-bold">
        Logo
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center space-x-12">
        {/* Language Selector */}
        <div className="flex items-center space-x-1">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHk9IjkiIHdpZHRoPSIyNCIgaGVpZ2h0PSI5IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo="
            alt="ID"
            className="w-6 h-4"
          />
          <span className="text-sm font-inter font-bold" style={{ color: '#274B9C' }}>Id</span>
          <svg className="w-4 h-4" style={{ color: '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Menu Items */}
        <a href="#" className="font-inter font-bold" style={{ color: '#274B9C' }}>Beranda</a>
        <a href="#" className="font-inter font-bold flex items-center space-x-1" style={{ color: '#274B9C' }}>
          <span>Peta</span>
          <HiArrowUpRight className="w-4 h-4" />
        </a>

        {/* Dropdown Items */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => setIsEkosistemOpen(!isEkosistemOpen)}
          >
            <a href="#" className="font-inter font-bold" style={{ color: '#274B9C' }}>Ekosistem</a>
            <svg className={`w-4 h-4 transition-transform ${isEkosistemOpen ? 'rotate-180' : ''}`} style={{ color: '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {isEkosistemOpen && (
            <div className="absolute top-full -right-14 mt-10 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    <circle cx="12" cy="9" r="1.5" fill="white" />
                    <path d="M8 15c0 2 1.79 4 4 4s4-2 4-4" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
                <div>
                  <div className="font-inter font-semibold text-gray-900">Mangrove</div>
                  <div className="text-sm text-gray-500">Ekosistem hutan bakau</div>
                </div>
              </a>

              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17h18v2H3v-2zm6.5-14L12 5.5 14.5 3 17 5.5 19.5 3 22 5.5V17H2V5.5L4.5 3 7 5.5 9.5 3z" />
                    <path d="M4 7v8h16V7H4zm2 2h12v4H6V9z" fill="white" />
                  </svg>
                </div>
                <div>
                  <div className="font-inter font-semibold text-gray-900">Padang Lamun</div>
                  <div className="text-sm text-gray-500">Ekosistem lamun laut</div>
                </div>
              </a>

              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <div>
                  <div className="font-inter font-semibold text-gray-900">Dugong</div>
                  <div className="text-sm text-gray-500">Mamalia laut herbivora</div>
                </div>
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <a href="#" className="font-inter font-bold" style={{ color: '#274B9C' }}>Publikasi</a>
          <svg className="w-4 h-4" style={{ color: '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="flex items-center space-x-1">
          <a href="#" className="font-inter font-bold" style={{ color: '#274B9C' }}>Tentang</a>
          <svg className="w-4 h-4" style={{ color: '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default Navbar