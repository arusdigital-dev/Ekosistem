import React from 'react'
import { aboutUsData, aboutUsConfig } from './data/aboutUsData.js'
import ArrowIcon from './components/ArrowIcon.jsx'
import Infographic from '../images/infographic.png'

const AboutUs = () => {
    return (
        <div className="pt-48 pb-[120px] px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="w-full">
                        <img
                            src={Infographic}
                            alt={aboutUsData.image.alt}
                            className={`w-full h-auto ${aboutUsConfig.borderRadius}`}
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6">
                        <div>
                            <p className="font-bold mb-2" style={{ color: aboutUsConfig.subtitleColor }}>
                                {aboutUsData.header.subtitle}
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: aboutUsConfig.primaryColor }}>
                                {aboutUsData.header.title}
                            </h2>
                        </div>

                        <p className="leading-relaxed font-medium" style={{ color: aboutUsConfig.textColor }}>
                            {aboutUsData.content.description}
                        </p>

                        <button 
                            className="text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2"
                            style={{ 
                                backgroundColor: aboutUsConfig.buttonColor,
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = aboutUsConfig.buttonHoverColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = aboutUsConfig.buttonColor}
                        >
                            {aboutUsData.content.buttonText}
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs