import React, { useState } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Penelitian terbaru mengenai ekosistem laut"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Konservasi terumbu karang di pesisir Indonesia"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
            title: "Lorem ipsum dolor sit amet consectetur",
            description: "Program restorasi mangrove berkelanjutan"
        }
    ];

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('next');
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setSlideDirection('');
        }, 350);
        setTimeout(() => setIsTransitioning(false), 700);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('prev');
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setSlideDirection('');
        }, 350);
        setTimeout(() => setIsTransitioning(false), 700);
    };

    return (
        <div className="py-16 px-8 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-6xl mx-auto">
                {/* Combined Header and Carousel Container */}
                <div className="relative bg-gray-100 rounded-3xl p-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-[#6D8FD4] font-bold mb-2">Update Terbaru dari Lapangan</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#274B9C] mb-8">
                            Berita dan cerita dari pesisir
                        </h2>
                    </div>

                    {/* Carousel Content */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="overflow-hidden relative">
                             <div className="flex items-center justify-center -space-x-20">
                             {/* Left Side Image */}
                             <div className={`relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl opacity-80 transform scale-95 transition-all duration-700 ease-in-out hover:scale-100 hover:opacity-90 z-10 ${
                                 slideDirection === 'next' ? 'translate-x-full scale-90 opacity-60 z-0' : 
                                 slideDirection === 'prev' ? '-translate-x-full scale-110 opacity-100 z-30' : ''
                             }`}>
                            <img
                                src={slides[(currentSlide - 1 + slides.length) % slides.length].image}
                                alt="Previous slide"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h4 className="text-sm font-bold mb-1">
                                    {slides[(currentSlide - 1 + slides.length) % slides.length].title}
                                </h4>
                                <p className="text-xs opacity-90">
                                    {slides[(currentSlide - 1 + slides.length) % slides.length].description}
                                </p>
                            </div>
                        </div>

                              {/* Main Center Image */}
                             <div className={`relative w-96 h-64 rounded-3xl overflow-hidden shadow-2xl drop-shadow-2xl z-20 transition-all duration-700 ease-in-out transform hover:scale-105 ${
                                 slideDirection === 'next' ? 'translate-x-full scale-90 opacity-70 z-10' : 
                                 slideDirection === 'prev' ? '-translate-x-full scale-90 opacity-70 z-10' : ''
                             }`}>
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-lg font-bold mb-1">
                                    {slides[currentSlide].title}
                                </h3>
                                <p className="text-sm opacity-90">
                                    {slides[currentSlide].description}
                                </p>
                            </div>
                        </div>

                              {/* Right Side Image */}
                             <div className={`relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl opacity-80 transform scale-95 transition-all duration-700 ease-in-out hover:scale-100 hover:opacity-90 z-10 ${
                                 slideDirection === 'next' ? '-translate-x-full scale-110 opacity-100 z-30' : 
                                 slideDirection === 'prev' ? 'translate-x-full scale-90 opacity-60 z-0' : ''
                             }`}>
                            <img
                                src={slides[(currentSlide + 1) % slides.length].image}
                                alt="Next slide"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h4 className="text-sm font-bold mb-1">
                                    {slides[(currentSlide + 1) % slides.length].title}
                                </h4>
                                <p className="text-xs opacity-90">
                                    {slides[(currentSlide + 1) % slides.length].description}
                                </p>
                            </div>
                        </div>
                        </div>
                        </div>

                        {/* Navigation Buttons - Below the images */}
                        <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={prevSlide}
                            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;