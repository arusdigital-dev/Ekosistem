import React from 'react'

const Kegiatan = () => {
    return (
        <div className="py-16 px-8 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-6xl mx-auto text-center">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-[#6D8FD4] font-bold mb-2">Aksi Nyata di Lapangan</p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#274B9C] mb-8">
                        Kegiatan dan proyek konservasi
                    </h2>
                </div>

                {/* Image Grid Layout */}
                <div className="flex justify-center gap-4 mb-8 max-w-6xl mx-auto">
                    {/* Left Column - 2 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {/* Image 1 - Beach Conservation */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Beach Conservation"
                                className="w-full h-38 object-cover"
                            />
                        </div>

                        {/* Image 2 - Seagrass Conservation */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Seagrass Conservation"
                                className="w-full h-38 object-cover"
                            />
                        </div>
                    </div>

                    {/* Center Column - 3 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {/* Image 3 - Mangrove Forest */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Mangrove Conservation"
                                className="w-full h-56 object-cover"
                            />
                        </div>

                        {/* Image 4 - Marine Life Research */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Marine Life Research"
                                className="w-full h-56 object-cover"
                            />
                        </div>

                        {/* Image 5 - Underwater Research */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Underwater Research"
                                className="w-full h-56 object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column - 2 Images */}
                    <div className="flex flex-col gap-4 flex-1">
                        {/* Image 6 - Marine Conservation */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Marine Conservation Project"
                                className="w-full h-38 object-cover"
                            />
                        </div>

                        {/* Image 7 - Ocean Conservation */}
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Ocean Conservation"
                                className="w-full h-38 object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button className="bg-[#274B9C] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 mx-auto">
                    Selengkapnya
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Kegiatan