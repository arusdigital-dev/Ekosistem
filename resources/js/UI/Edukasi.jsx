import React from 'react';
import Wave2 from '../images/Wave2.png';
import Wave1 from '../images/Wave1.png';
import Wave3 from '../images/Wave3.png';

const Edukasi = () => {
    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Header Section */}
            <div className="text-center py-8">
                <p className="text-blue-500 text-sm font-bold mb-2">Edukasi & Konservasi Laut</p>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
                    Eksplorasi tiga penjaga laut kita
                </h1>
            </div>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="relative" style={{ height: '332px', width: '1241px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            alt="Underwater marine life"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center ml-24">
                            <div className="max-w-2xl px-8 md:px-12">
                                <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                                </h2>
                                <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id verius orci morbi eget est tellus. Sit senectus massa risus lectus
                                </p>
                                <button className="bg-white text-[#274B9C] px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2">
                                    Selengkapnya
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Wave Icon */}
                        <div className="absolute top-8 right-8 z-10">
                            <img
                                src={Wave2}
                                alt="Wave icon"
                                className="w-12 h-12 opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-60">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="relative" style={{ height: '332px', width: '1241px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            alt="Underwater marine life"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center ml-24">
                            <div className="max-w-2xl px-8 md:px-12">
                                <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                                </h2>
                                <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id verius orci morbi eget est tellus. Sit senectus massa risus lectus
                                </p>
                                <button className="bg-white text-[#274B9C] px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2">
                                    Selengkapnya
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Wave Icon */}
                        <div className="absolute top-8 right-8 z-10">
                            <img
                                src={Wave1}
                                alt="Wave icon"
                                className="w-12 h-12 opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 pb-20">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="relative" style={{ height: '332px', width: '1241px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            alt="Underwater marine life"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center ml-24">
                            <div className="max-w-2xl px-8 md:px-12">
                                <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                                </h2>
                                <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id verius orci morbi eget est tellus. Sit senectus massa risus lectus
                                </p>
                                <button className="bg-white text-[#274B9C] px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2">
                                    Selengkapnya
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Wave Icon */}
                        <div className="absolute top-8 right-8 z-10">
                            <img
                                src={Wave3}
                                alt="Wave icon"
                                className="w-12 h-12 opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edukasi;