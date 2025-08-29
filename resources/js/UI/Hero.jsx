import React from 'react';
import Navbar from '../components/Navbar';
import Background from '../images/Hero.png';
import { heroData, heroConfig } from './data/heroData.js';
import ArrowIcon from './components/ArrowIcon.jsx';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-center bg-no-repeat pb-[180px]"
      style={{
        backgroundImage: `url(${Background})`,
        margin: '0',
        padding: '0',
        top: '0',
        left: '0',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'scroll'
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Navbar */}
      <div className="absolute top-6 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen pl-16 pr-7 pb-12">
        <div className="max-w-3xl" style={{ marginTop: heroConfig.marginTop }}>
          <div className="text-left ml-10 pr-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {heroData.title.line1}
              <br />
              {heroData.title.line2}
              <br />
              {heroData.title.line3}
            </h1>

            <p className="text-base sm:text-lg text-white mb-8 max-w-3xl leading-relaxed opacity-90">
              {heroData.description.line1}
              <br />
              {heroData.description.line2}
              <br />
              {heroData.description.line3}
              <br />
              {heroData.description.line4}
            </p>

            <button 
              className="bg-white text-blue-600 px-5 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-1"
              style={{ color: heroConfig.primaryColor }}
            >
              {heroData.button.text}
              <ArrowIcon size={12} color={heroConfig.primaryColor} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;