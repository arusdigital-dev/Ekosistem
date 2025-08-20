import React from "react";

const LaporSection = () => {
    return (
        <div
            className="min-h-screen bg-white"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image Wrapper */}
                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[332px]">
                        <img
                            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            alt="Dugong"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center px-6 sm:px-8 md:pl-24">
                            <div className="max-w-4xl">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
                                    Lorem ipsum dolor sit amet consectetur. In
                                    porta nec est et diam.
                                </h2>
                                <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur. In
                                    porta nec est et diam. Cursus risus
                                    malesuada id verius orci morbi eget est
                                    tellus. Sit senectus massa risus lectus
                                </p>
                                <button className="bg-white text-[#274B9C] px-3 md:px-6 py-2 md:text-base text-sm  rounded-full font-semibold transition-colors duration-300 flex items-center gap-1 hover:bg-gray-100">
                                    Lapor
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporSection;
