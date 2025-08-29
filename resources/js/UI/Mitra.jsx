import React from 'react';
import { mitraData, mitraConfig } from './data/mitraData.js';
import ArrowIcon from './components/ArrowIcon.jsx';

const Mitra = () => {
    return (
        <div className="min-h-screen bg-white pb-12 mt-24">
            {/* Header Section */}
            <div className="text-center py-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: mitraConfig.primaryColor }}>
                    {mitraData.header.title}
                </h1>

                {/* Partner Logos */}
                <div className="py-8">
                    <hr className={`${mitraConfig.containerMaxWidth} w-full border-gray-400 mb-8 mx-auto`} />
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 px-4 mb-8">
                        {mitraData.partners.map((partner) => (
                            <div key={partner.id} className={mitraConfig.partnerStyles[partner.style]}>
                                {partner.name}
                            </div>
                        ))}
                    </div>
                    <hr className={`${mitraConfig.containerMaxWidth} w-full border-gray-400 mb-8 mx-auto`} />
                </div>
            </div>

            {/* Hero Section */}
            <div className={`${mitraConfig.containerMaxWidth} mx-auto px-4`}>
                <div className={`relative overflow-hidden ${mitraConfig.borderRadius} ${mitraConfig.shadowClass}`}>
                    {/* Background Image */}
                    <div className={`relative ${mitraConfig.heroHeight}`}>
                        <img
                            src={mitraData.hero.image.src}
                            alt={mitraData.hero.image.alt}
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className={`absolute inset-0 ${mitraConfig.overlayGradient}`}></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-2xl px-8 md:px-12">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    {mitraData.hero.title}
                                </h2>
                                <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
                                    {mitraData.hero.description.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            {index < mitraData.hero.description.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                                <button 
                                    className="px-6 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2"
                                    style={{ 
                                        backgroundColor: mitraConfig.buttonColor,
                                        color: mitraConfig.buttonTextColor
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = mitraConfig.buttonHoverColor}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = mitraConfig.buttonColor}
                                >
                                    {mitraData.hero.button.text}
                                    <ArrowIcon color={mitraConfig.buttonTextColor} />
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