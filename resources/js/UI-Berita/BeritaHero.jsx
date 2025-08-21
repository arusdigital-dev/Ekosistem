import React from 'react'
import Navbar from '../Components/Navbar'

const BeritaHero = () => {
    return (
        <div className="bg-white">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-20">
                <Navbar currentPage="Berita" />

            </div>

            {/* Breadcrumb */}
            <div className="px-16 mt-36">
                <div className="flex items-center space-x-2 text-sm font-bold">
                    <a href="/" className="text-[#6D8FD4] hover:underline">Publikasi</a>
                    <span className="text-gray-400">→</span>
                    <span className="text-[#274B9C]">Berita</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="px-16 mt-8">
                <div className="relative rounded-3xl overflow-hidden h-[750px] bg-gradient-to-r from-black/60 to-black/30">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop&crop=center)'
                        }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-end h-full px-12 pb-16 text-white">
                        <h1 className="font-bold text-4xl mb-4 leading-tight">
                            Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                        </h1>
                        <p className="text-lg max-w-md leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. In porta nec<br />
                            est et diam. Cursus risus malesuada id varius oras<br />
                            morbi eget est tellus. Sit senectus massa risus laetus
                        </p>
                        <button
                            className="font-medium text-white px-6 py-3 rounded-full text-sm inline-flex items-center space-x-2 transition-colors hover:opacity-90 w-fit mt-12"
                            style={{ backgroundColor: '#274B9C' }}
                        >
                            <span>Selengkapnya</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeritaHero