import React from 'react';
import { beritaData } from './data/beritaData';
import UserIcon from './components/UserIcon';
import CalendarIcon from './components/CalendarIcon';

// Constants
const CARD_HEIGHT = 'h-48';
const AVATAR_SIZE = 'w-6 h-6';
const BUTTON_COLOR = '#274B9C';

const BeritaSections = () => {
    // Event handlers
    const handleBeritaClick = (beritaId) => {
        window.location.href = `/berita/${beritaId}`;
    };

    const handleLoadMore = () => {
        // TODO: Implement load more functionality
        console.log('Load more berita');
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-16">
                {/* Title */}
                <h2 className="font-bold text-3xl text-[#274B9C] text-center mb-12">
                    Berita terkini
                </h2>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {beritaData.map((berita) => (
                        <div 
                            key={berita.id} 
                            className="bg-white cursor-pointer hover:transform hover:scale-105 transition-transform duration-200" 
                            onClick={() => handleBeritaClick(berita.id)}
                        >
                            {/* Image */}
                            <div className={`relative ${CARD_HEIGHT} overflow-hidden mb-4`}>
                                <img
                                    src={berita.image}
                                    alt={berita.title}
                                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {/* Date */}
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <CalendarIcon />
                                    {berita.date}
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-lg text-[#274B9C] mb-3 leading-tight">
                                    {berita.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    {berita.description}
                                </p>

                                {/* Author */}
                                <div className="flex items-center text-sm">
                                    <div className={`${AVATAR_SIZE} bg-gray-300 rounded-full mr-2 flex items-center justify-center`}>
                                        <UserIcon />
                                    </div>
                                    <span className="text-[#274B9C] font-medium">{berita.author}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center">
                    <button 
                        className="font-medium text-white px-8 py-3 rounded-full transition-colors hover:opacity-90" 
                        style={{ backgroundColor: BUTTON_COLOR }}
                        onClick={handleLoadMore}
                    >
                        Muat Lebih Banyak
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BeritaSections