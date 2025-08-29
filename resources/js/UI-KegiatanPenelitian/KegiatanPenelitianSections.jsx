import React from 'react'
import Navbar from '../Components/Navbar'

const KegiatanPenelitianSections = () => {
    return (
        <div className="bg-white">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-20">
                <Navbar currentPage="Kegiatan Penelitian" />
            </div>

            {/* Breadcrumb */}
            <div className="px-16 mt-36">
                <div className="flex items-center space-x-2 text-sm font-bold">
                    <a href="/" className="text-[#6D8FD4] hover:underline">Publikasi</a>
                    <span className="text-gray-400">→</span>
                    <span className="text-[#274B9C]">Kegiatan Penelitian</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-16 mt-8 pb-16">
                {/* Title */}
                <h1 className="font-bold text-4xl text-[#274B9C] mb-8">
                    Kegiatan Penelitian
                </h1>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <p className="text-[#274B9C] font-bold leading-relaxed text-justify">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet amet tincidunt donec sit quis malesuada et.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci donec sit quis malesuada et. Interdum a viverra viverra risus porttitor. Cursus porttitor integer lectus lacus orci dui penatibus eu semper. Elit maecenas ac orci dui lorem aliquam vitae nulla diam elementum augue. Interdum a viverra viverra risus porttitor. Cursus porttitor integer lectus lacus orci dui penatibus eu semper. Elit maecenas ac orci dui lorem aliquam vitae nulla diam elementum augue. Sed semper ullamcorper dictum vitae ullamcorper donec. Odis et ultrices felis proin. Lectus amet donec et dictum morbi ultrices sagittis
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KegiatanPenelitianSections