import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { Link } from '@inertiajs/react'

const BeritaDetail = ({ beritaId }) => {
    // Sample data - in real app this would come from backend
    const beritaData = {
        1: {
            id: 1,
            date: '19 Agustus 2025',
            title: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus. Sit sapien pharetra risus lectus morbi eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
        },
        2: {
            id: 2,
            date: '18 Agustus 2025',
            title: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus. Sit sapien pharetra risus lectus morbi eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
        }
    }

    const berita = beritaData[beritaId] || {
        id: beritaId,
        date: '19 Agustus 2025',
        title: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.',
        description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
        author: 'Lorem ipsum dolor',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-20">
                <Navbar currentPage="Berita" />
            </div>

            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-4 py-8 mt-24">
                <Link href="/Berita" className="inline-flex items-center text-[#274B9C] hover:text-blue-800 mb-6 font-bold">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </Link>

                {/* Hero Image */}
                <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
                    <img
                        src={berita.image}
                        alt={berita.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Article Content */}
                <article className="max-w-3xl mx-auto">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-[#274B9C] mb-6 leading-tight">
                        {berita.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center text-gray-600 mb-8 pb-6 border-gray-200 gap-8">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{berita.date}</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-[#274B9C] font-medium">{berita.author}</span>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            {berita.description}
                        </p>
                    </div>
                </article>
            </div>
            <Footer />
        </div>
    )
}

export default BeritaDetail