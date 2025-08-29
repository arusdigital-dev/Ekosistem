import React, { useState } from 'react';
import { carouselData, carouselConfig } from './data/carouselData.js';
import ChevronLeftIcon from './components/ChevronLeftIcon.jsx';
import ChevronRightIcon from './components/ChevronRightIcon.jsx';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');

    const { slides } = carouselData;

    const handleNextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('next');
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setSlideDirection('');
        }, carouselConfig.slideDelay);
        setTimeout(() => setIsTransitioning(false), carouselConfig.transitionDuration);
    };

    const handlePrevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('prev');
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setSlideDirection('');
        }, carouselConfig.slideDelay);
        setTimeout(() => setIsTransitioning(false), carouselConfig.transitionDuration);
    };

    return (
        <div className="py-16 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Combined Header and Carousel Container */}
                <div className="relative bg-gray-100 rounded-3xl p-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="font-bold mb-2" style={{ color: carouselConfig.subtitleColor }}>
                            {carouselData.header.subtitle}
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: carouselConfig.primaryColor }}>
                            {carouselData.header.title}
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
                            onClick={handlePrevSlide}
                            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                        >
                            <ChevronLeftIcon color="#374151" />
                        </button>

                        <button
                            onClick={handleNextSlide}
                            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                        >
                            <ChevronRightIcon color="#374151" />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;