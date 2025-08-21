import React from 'react'

const BeritaSections = () => {
    const beritaData = [
        {
            id: 1,
            date: '19 Agustus 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            date: '18 Agustus 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            date: '04 Agustus 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            date: '04 Juli 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            date: '16 Juli 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
            id: 6,
            date: '04 Juli 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1569163139394-de44cb5894c6?w=400&h=300&fit=crop'
        },
        {
            id: 7,
            date: '01 Juli 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
        },
        {
            id: 8,
            date: '12 Juni 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
        },
        {
            id: 9,
            date: '10 Juni 2025',
            title: 'Lorem ipsum dolor',
            description: 'Lorem ipsum dolor sit amet consectetur. In porta nec est et diam. Cursus risus malesuada id varius orci mauris eget est tellus.',
            author: 'Lorem ipsum dolor',
            image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'
        }
    ]

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
                        <div key={berita.id} className="bg-white cursor-pointer hover:transform hover:scale-105 transition-transform duration-200" onClick={() => window.location.href = `/berita/${berita.id}`}>
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden mb-4">
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
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
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
                                    <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-[#274B9C] font-medium">{berita.author}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center">
                    <button className="font-medium text-white px-8 py-3 rounded-full transition-colors hover:opacity-90" style={{ backgroundColor: '#274B9C' }}>
                        Muat Lebih Banyak
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BeritaSections