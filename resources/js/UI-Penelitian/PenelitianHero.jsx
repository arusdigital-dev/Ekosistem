import React from 'react';
import Navbar from '../Components/Navbar'

const PenelitianHero = () => {
    return (
        <div className="bg-white">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-20">
                <Navbar currentPage="Peneliti" />
            </div>

            {/* Breadcrumb */}
            <div className="px-16 mt-36">
                <div className="flex items-center space-x-2 text-sm font-bold">
                    <a href="/" className="text-[#6D8FD4] hover:underline">Tentang</a>
                    <span className="text-gray-400">→</span>
                    <span className="text-[#274B9C]">Peneliti</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="px-16 mt-8">
                <div className="relative rounded-3xl overflow-hidden h-96 bg-gradient-to-r from-black/60 to-black/30">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop&crop=center)'
                        }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
                        <h1 className="font-bold text-4xl mb-4 leading-tight">
                            Lorem ipsum dolor sit amet<br />
                            consectetur. In porta nec est et diam.
                        </h1>
                        <p className="text-lg max-w-md leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. In porta nec<br />
                            est et diam. Cursus risus malesuada id varius oras<br />
                            morbi eget est tellus. Sit senectus massa risus laetus
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PenelitianHero
