import React from 'react';

const Mitra = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Header Section */}
            <div className="text-center py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#274B9C] mb-12">
                    Mitra kami
                </h1>

                {/* Partner Logos */}
                <div className="py-8">
                    <hr className="max-w-6xl w-full border-gray-400 mb-8 mx-auto" />
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 px-4 mb-8">
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60">
                            Nike
                        </div>
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60">
                            HUSH
                        </div>
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60">
                            PUMA
                        </div>
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60 border border-gray-300 px-3 py-1 rounded">
                            SHOEI
                        </div>
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60">
                            Marc
                        </div>
                        <div className="text-gray-400 text-2xl md:text-3xl font-bold opacity-60 italic">
                            Supreme
                        </div>
                    </div>
                    <hr className="max-w-6xl w-full border-gray-400 mb-8 mx-auto" />
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="relative h-80 md:h-96">
                        <img
                            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            alt="Underwater marine life"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-2xl px-8 md:px-12">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                                </h2>
                                <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.<br />
                                    Cursus risus malesuada id varius orci morbi eget est tellus.<br />
                                    Sit senectus massa risus lectus.
                                </p>
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                                    Lapor
                                    <span className="ml-2">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mitra;