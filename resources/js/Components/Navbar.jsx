import React, { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import Mangrove from '../images/Mangrove.png'
import Lamun from '../images/Lamun.png'
import Dugong from '../images/Dugong.png'
import Peneliti from '../images/Peneliti.png'
import Kontak from '../images/Kontak.png'
import Berita from '../images/Berita.png'
import PenelitianTerdahulu from '../images/PenelitianTerdahulu.png'
import Artikel from '../images/Artikel.png'

const Navbar = ({ currentPage = 'Ekosistem' }) => {
  const [isEkosistemOpen, setIsEkosistemOpen] = useState(false)
  const [isTentangOpen, setIsTentangOpen] = useState(false)
  const [isPublikasiOpen, setIsPublikasiOpen] = useState(false)

  // Determine the display text based on current page
  const getNavbarText = () => {
    if (currentPage === 'Mangrove') {
      return 'Mangrove'
    }
    if (currentPage === 'Padang Lamun') {
      return 'Padang Lamun'
    }
    return 'Ekosistem'
  }

  // Determine the display text for Publikasi dropdown
  const getPublikasiText = () => {
    if (currentPage === 'Berita') {
      return 'Berita'
    }
    if (currentPage === 'Kegiatan Penelitian') {
      return 'Kegiatan Penelitian'
    }
    if (currentPage === 'Artikel') {
      return 'Artikel'
    }
    return 'Publikasi'
  }

  const getTentangText = () => {
    if (currentPage === 'Peneliti') {
      return 'Peneliti'
    }
    if (currentPage === 'Kontak') {
      return 'Kontak'
    }
    return 'Tentang'
  }

  // Determine which dropdown should be highlighted
  const getActiveDropdown = () => {
    if (currentPage === 'Peneliti' || currentPage === 'Kontak') {
      return 'tentang'
    }
    if (currentPage === 'Berita' || currentPage === 'Kegiatan Penelitian' || currentPage === 'Artikel') {
      return 'publikasi'
    }
    if (currentPage === 'Mangrove' || currentPage === 'Padang Lamun') {
      return 'ekosistem'
    }
    return null
  }

  return (
    <nav className="flex items-center justify-between px-10 py-3 bg-[#F3F4F6] backdrop-blur-sm rounded-full my-3 max-w-6xl mx-auto">
      {/* Logo */}
      <div className="bg-blue-800 text-white px-6 py-2 rounded-full font-bold">
        Logo
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center space-x-12">
        {/* Language Selector */}
        <div className="flex items-center space-x-1">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHk9IjkiIHdpZHRoPSIyNCIgaGVpZ2h0PSI5IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo="
            alt="ID"
            className="w-6 h-4 rounded"
          />
          <span className="text-sm font-bold" style={{ color: '#274B9C' }}>Id</span>
          <svg className="w-4 h-4" style={{ color: '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Menu Items */}
        <a href="/" className="font-bold" style={{ color: '#274B9C' }}>Beranda</a>
        <a href="#" className="font-bold flex items-center space-x-1" style={{ color: '#274B9C' }}>
          <span>Peta</span>
          <HiArrowUpRight className="w-4 h-4" />
        </a>

        {/* Dropdown Items */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              setIsEkosistemOpen(!isEkosistemOpen)
              setIsTentangOpen(false)
              setIsPublikasiOpen(false)
            }}
          >
            <span className="font-bold" style={{ color: (isEkosistemOpen || getActiveDropdown() === 'ekosistem') ? '#6D7280' : '#274B9C' }}>{getNavbarText()}</span>
            <svg className={`w-4 h-4 transition-transform ${isEkosistemOpen ? 'rotate-180' : ''}`} style={{ color: (isEkosistemOpen || getActiveDropdown() === 'ekosistem') ? '#6D7280' : '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {isEkosistemOpen && (
            <div className="absolute top-full -right-10 mt-10  w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="/Ekosistem-Mangrove" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center mr-3 mb-4">
                  <img src={Mangrove} alt="Mangrove" className="w-5 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#274B9C]">Mangrove</div>
                  <div className="text-sm text-gray-500">Ekosistem hutan bakau</div>
                </div>
              </a>

              <a href="/Ekosistem-Lamun" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center mr-3 mb-4">
                  <img src={Lamun} alt="Lamun" className="w-5 h-4" />

                </div>
                <div>
                  <div className="font-semibold text-[#274B9C]">Padang Lamun</div>
                  <div className="text-sm text-gray-500">Ekosistem lamun laut</div>
                </div>
              </a>

              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg flex items-center justify-center mr-3 mb-4">
                  <img src={Dugong} alt="Dugong" className="w-5 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#274B9C]">Dugong</div>
                  <div className="text-sm text-gray-500">Mamalia laut herbivora</div>
                </div>
              </a>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              setIsPublikasiOpen(!isPublikasiOpen)
              setIsEkosistemOpen(false)
              setIsTentangOpen(false)
            }}
          >
            <span className="font-bold" style={{ color: (isPublikasiOpen || getActiveDropdown() === 'publikasi') ? '#6D7280' : '#274B9C' }}>{getPublikasiText()}</span>
            <svg className={`w-4 h-4 transition-transform ${isPublikasiOpen ? 'rotate-180' : ''}`} style={{ color: (isPublikasiOpen || getActiveDropdown() === 'publikasi') ? '#6D7280' : '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {isPublikasiOpen && (
            <div className="absolute top-full -right-32 mt-10 w-[1000px] bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex gap-4">
                <div className="rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-full h-20 rounded-lg mb-3 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop)' }}>
                  </div>
                  <h3 className="font-semibold text-[#274B9C] text-sm mb-1">Lorem ipsum dolor sit amet</h3>
                  <p className="text-xs text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus molestie ut varius orci mauris eget est tellus.</p>
                  <div className="flex items-center text-[#274B9C] text-xs">
                    <img src={Berita} alt="Berita" className="w-3 h-3 mr-1" />
                    <a href="/Berita" className="font-medium">Berita</a>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Lorem Ipsum Dolor Amet</p>
                </div>

                <div className="rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-full h-20 rounded-lg mb-3 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop)' }}>
                  </div>
                  <h3 className="font-semibold text-[#274B9C] text-sm mb-1">Lorem ipsum dolor sit amet</h3>
                  <p className="text-xs text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus molestie ut varius orci mauris eget est tellus.</p>
                  <div className="flex items-center text-[#274B9C] text-xs">
                    <img src={PenelitianTerdahulu} alt="Penelitian Terdahulu" className="w-3 h-3 mr-1" />
                    <a href="/Kegiatan-Penelitian" className="font-medium">Kegiatan Penelitian</a>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Lorem Ipsum Dolor Amet</p>
                </div>

                <div className="rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-full h-20 rounded-lg mb-3 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop)' }}>
                  </div>
                  <h3 className="font-semibold text-[#274B9C] text-sm mb-1">Lorem ipsum dolor sit amet</h3>
                  <p className="text-xs text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus molestie ut varius orci mauris eget est tellus.</p>
                  <div className="flex items-center text-[#274B9C] text-xs">
                    <img src={Artikel} alt="Artikel" className="w-3 h-3 mr-1" />
                    <a href="/Artikel" className="font-medium">Artikel</a>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Lorem Ipsum Dolor Amet</p>
                </div>

                <div className="w-px bg-gray-300 mx-2"></div>

                <div className="rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-full h-20 bg-gray-400 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white text-xs">Image</span>
                  </div>
                  <h3 className="font-semibold text-[#274B9C] text-sm mb-1">Lorem ipsum dolor sit amet</h3>
                  <div className="bg-[#274B9C] text-white px-3 py-1 rounded-full text-xs font-medium inline-block mt-2">
                    Selengkapnya
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => {
              setIsTentangOpen(!isTentangOpen)
              setIsEkosistemOpen(false)
              setIsPublikasiOpen(false)
            }}
          >
            <span className="font-bold" style={{ color: (isTentangOpen || getActiveDropdown() === 'tentang') ? '#6D7280' : '#274B9C' }}>{getTentangText()}</span>
            <svg className={`w-4 h-4 transition-transform ${isTentangOpen ? 'rotate-180' : ''}`} style={{ color: isTentangOpen ? '#6D7280' : '#274B9C' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {isTentangOpen && (
            <div className="absolute top-full -right-16 mt-10 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="/Peneliti" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center mr-3 mb-4">
                  <img src={Peneliti} alt="Peneliti" className="w-5 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#274B9C]">Peneliti</div>
                  <div className="text-sm text-gray-500">Lorem Ipsum Dolor Amet</div>
                </div>
              </a>

              <a href="/Kontak" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center mr-3 mb-4">
                  <img src={Kontak} alt="Kontak" className="w-5 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#274B9C]">Kontak</div>
                  <div className="text-sm text-gray-500">Lorem Ipsum Dolor Amet</div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar