import React from 'react';
import Navbar from '../components/Navbar';
import Background from '../images/Hero.png'

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-center bg-no-repeat pb-32"
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
        <div className="max-w-3xl" style={{ marginTop: '30rem' }}>
          <div className="text-left ml-10 pr-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}>
              Lorem ipsum dolor sit
              <br />
              amet consectetur. In
              <br />
              porta nec est et diam.
            </h1>

            <p className="text-base sm:text-lg text-white mb-8 max-w-3xl leading-relaxed opacity-90"
              style={{ fontFamily: 'Inter, sans-serif' }}>
              Lorem ipsum dolor sit amet consectetur. In porta nec
              <br />
              est et diam. Cursus risus malesuada id varius orci
              <br />
              morbi eget est tellus. Sit senectus massa risus lectus
              <br />
              turpis malesuada mattis. Nibh mi tellus sed ut.
            </p>

            <button className="bg-white text-blue-600 px-5 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-1"
              style={{ fontFamily: 'Inter, sans-serif', color: '#274B9C' }}>
              Selengkapnya
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;