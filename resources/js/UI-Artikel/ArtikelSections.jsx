import React from 'react'
import Navbar from '../Components/Navbar'

const ArtikelSections = () => {
    return (
        <div className="bg-white">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-20">
                <Navbar currentPage="Artikel" />
            </div>

            {/* Breadcrumb */}
            <div className="px-16 mt-36">
                <div className="flex items-center space-x-2 text-sm font-bold">
                    <a href="/" className="text-[#6D8FD4] hover:underline">Publikasi</a>
                    <span className="text-gray-400">→</span>
                    <span className="text-[#274B9C]">Artikel</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-16 mt-8 pb-16">
                {/* Title */}
                <h1 className="font-bold text-4xl text-[#274B9C] mb-8">
                    Artikel
                </h1>



                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <p className="text-[#274B9C] font-bold leading-relaxed text-justify">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci donec sit quis malesuada et. Interdum a viverra viverra risus porttitor. Cursus porttitor integer lectus lacus orci dui penatibus eu semper.
                        </p>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="mt-16">
                    <div className="flex gap-6 justify-center">
                        {/* Large Article Card - 606x536px */}
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ width: '606px', height: '536px' }}>
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop)' }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h3 className="text-2xl font-bold mb-3">Lorem ipsum dolor</h3>
                                    <div className="flex items-center text-sm">
                                        <div className="w-6 h-6 bg-gray-400 rounded-full mr-2"></div>
                                        <span className="mr-4">Lorem ipsum dolor</span>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            <span>19 Agustus 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Article Cards - 604x258px each */}
                        <div className="flex flex-col gap-6">
                            {/* First Small Card */}
                            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ width: '604px', height: '258px' }}>
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h4 className="text-lg font-bold mb-2">Lorem ipsum dolor</h4>
                                        <div className="flex items-center text-xs">
                                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                            <span className="mr-2">Lorem ipsum dolor</span>
                                            <div className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <span>19 Agustus 2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Second Small Card */}
                            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ width: '604px', height: '258px' }}>
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h4 className="text-lg font-bold mb-2">Lorem ipsum dolor</h4>
                                        <div className="flex items-center text-xs">
                                            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                                            <span className="mr-2">Lorem ipsum dolor</span>
                                            <div className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <span>19 Agustus 2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center mt-12">
                        <button className="bg-[#274B9C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1e3a7a] transition-colors">
                            Muat Lebih Banyak
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtikelSections