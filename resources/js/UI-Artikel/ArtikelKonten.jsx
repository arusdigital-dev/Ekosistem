import React from 'react';
import { artikelData } from './data/artikelData';
import UserIcon from './components/UserIcon';
import CalendarIcon from './components/CalendarIcon';

// Constants
const CARD_HEIGHT = 'h-48';
const AVATAR_SIZE = 'w-6 h-6';

const ArtikelKonten = () => {
    // Event handlers
    const handleArtikelClick = (artikelId) => {
        window.location.href = `/artikel/${artikelId}`;
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-16">

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {artikelData.map((artikel) => (
                        <div 
                            key={artikel.id} 
                            className="bg-white cursor-pointer hover:transform hover:scale-105 transition-transform duration-200" 
                            onClick={() => handleArtikelClick(artikel.id)}
                        >
                            {/* Image */}
                            <div className={`relative ${CARD_HEIGHT} overflow-hidden mb-4`}>
                                <img
                                    src={artikel.image}
                                    alt={artikel.title}
                                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {/* Title */}
                                <h3 className="font-bold text-lg text-[#274B9C] mb-3 leading-tight">
                                    {artikel.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    {artikel.description}
                                </p>

                                {/* Bottom section with Author and Date */}
                                <div className="flex items-center justify-between text-sm">
                                    {/* Author */}
                                    <div className="flex items-center">
                                        <div className={`${AVATAR_SIZE} bg-gray-300 rounded-full mr-2 flex items-center justify-center`}>
                                            <UserIcon />
                                        </div>
                                        <span className="text-[#274B9C] font-medium">{artikel.author}</span>
                                    </div>
                                    
                                    {/* Date */}
                                    <div className="flex items-center text-gray-500">
                                        <CalendarIcon />
                                        {artikel.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtikelKonten