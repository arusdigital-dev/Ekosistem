import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { prosesData } from './data/prosesData';
import CloseIcon from './components/CloseIcon';

// Constants
const SLIDE_WIDTH = '716px';
const SLIDE_HEIGHT = '738px';
const SWIPER_CONFIG = {
    spaceBetween: 40,
    slidesPerView: "auto",
    centeredSlides: false,
    allowTouchMove: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    simulateTouch: true,
    touchStartPreventDefault: false,
    touchMoveStopPropagation: false,
    freeMode: {
        enabled: true,
        sticky: false,
        momentumRatio: 0.25,
        momentumVelocityRatio: 0.25
    },
    mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: false
    },
    watchSlidesProgress: true,
    resistanceRatio: 0
};

const ExpoSlider = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Event handlers
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <div className="bg-white">
            <style dangerouslySetInnerHTML={{
                __html: `
                    .modal-content::-webkit-scrollbar {
                        display: none;
                    }
                    .modal-content {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `
            }} />
            <div className="max-w-7xl mx-auto px-16">
                {/* Title */}
                <h2 className="font-bold text-3xl text-[#274B9C] text-center mb-12">
                    Proses dibalik penelitian
                </h2>

                {/* Swiper Container - Slides overflow beyond screen */}
                <div className="relative mb-16 ml-52">
                    <Swiper
                        modules={[FreeMode, Mousewheel]}
                        {...SWIPER_CONFIG}
                        className="w-full"
                        style={{
                            overflow: 'visible',
                            height: SLIDE_HEIGHT
                        }}
                    >
                        {prosesData.map((item) => (
                            <SwiperSlide key={item.id} style={{ width: SLIDE_WIDTH }}>
                                <div
                                    className="relative rounded-2xl overflow-hidden w-full cursor-pointer transition-transform hover:scale-105"
                                    style={{ height: SLIDE_HEIGHT, width: SLIDE_WIDTH }}
                                    onClick={() => handleOpenModal(item)}
                                >
                                    {/* Background Image */}
                                    <img
                                        src={item.image}
                                        alt={`Slide ${item.id}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40"></div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                                        <p className="font-medium text-3xl leading-relaxed">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
                    onClick={handleModalBackdropClick}
                >
                    <div 
                        className="modal-content bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-[#274B9C] mb-2">Kegiatan Penelitian</h3>
                                {selectedItem && (
                                    <h4 className="text-xl font-semibold text-gray-800">{selectedItem.title}</h4>
                                )}
                            </div>
                            <CloseIcon onClick={handleCloseModal} />
                        </div>
                        {selectedItem && (
                            <div>
                                <img 
                                    src={selectedItem.image} 
                                    alt="Kegiatan Penelitian" 
                                    className="w-full h-80 object-cover rounded-lg mb-6" 
                                />
                                <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpoSlider