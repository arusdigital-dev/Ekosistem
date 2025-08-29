import React from 'react';
import { kegiatanData, kegiatanConfig } from './data/kegiatanData.js';
import ArrowIcon from './components/ArrowIcon.jsx';

const Kegiatan = () => {
    return (
        <div className="pb-[120px] px-8 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                {/* Header */}
                <div className="mb-12">
                    <p className="font-bold mb-2" style={{ color: kegiatanConfig.subtitleColor }}>
                        {kegiatanData.header.subtitle}
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: kegiatanConfig.primaryColor }}>
                        {kegiatanData.header.title}
                    </h2>
                </div>

                {/* Image Grid Layout */}
                <div className="flex justify-center gap-4 mb-8 max-w-6xl mx-auto">
                    {/* Left Column - 2 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {kegiatanData.images.leftColumn.map((image) => (
                            <div key={image.id} className="rounded-2xl overflow-hidden">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`w-full ${image.height} object-cover`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Center Column - 3 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {kegiatanData.images.centerColumn.map((image) => (
                            <div key={image.id} className="rounded-2xl overflow-hidden">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`w-full ${image.height} object-cover`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Column - 2 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {kegiatanData.images.rightColumn.map((image) => (
                            <div key={image.id} className="rounded-2xl overflow-hidden">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`w-full ${image.height} object-cover`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <button 
                    className="text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
                    style={{ backgroundColor: kegiatanConfig.primaryColor }}
                >
                    {kegiatanData.button.text}
                    <ArrowIcon size={16} color="white" />
                </button>
            </div>
        </div>
    )
}

export default Kegiatan