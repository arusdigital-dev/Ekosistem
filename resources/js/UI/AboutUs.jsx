import React from 'react'
import Infographic from '../images/infographic.png'

const AboutUs = () => {
    return (
        <div className="pt-48 pb-[120px] px-8 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="w-full">
                        <img
                            src={Infographic}
                            alt="About Us"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-[#6D8FD4] font-bold mb-2">Tentang Kita</p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#274B9C] mb-4">
                                Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed font-medium">
                            Lorem ipsum dolor sit amet consectetur. In porta nec<br />
                            est et diam.Cursus risus molestie auctor id varius cras. <br />
                            Viverra eget mauris bibendum sit nibh et   magna risus lectus <br />
                            mattis. Nibh mi tellus sed ut.
                        </p>

                        <button className="bg-[#274B9C] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2">
                            Selengkapnya
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs