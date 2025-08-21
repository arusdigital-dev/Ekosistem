import React, { useState } from 'react'
import { Shrink, Expand } from 'lucide-react'

// Custom styles for animations
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }
`

const LamunSections = () => {
    const [expandedCards, setExpandedCards] = useState({})

    const toggleCard = (cardId) => {
        setExpandedCards(prev => {
            const isCurrentlyExpanded = prev[cardId]
            if (isCurrentlyExpanded) {
                // If currently expanded, collapse it
                return { [cardId]: false }
            } else {
                // If not expanded, expand only this card and hide others
                return { [cardId]: true }
            }
        })
    }
    return (
        <div className="px-16 py-16 bg-white">
            <style>{customStyles}</style>
            {/* Title */}
            <h2 className="font-bold text-4xl text-center mb-16" style={{ color: '#274B9C' }}>
                Mengenai padang lamun
            </h2>

            {/* Grid Layout */}
            <div className={`grid gap-8 max-w-6xl mx-auto transition-all duration-500 ease-in-out ${Object.values(expandedCards).some(expanded => expanded)
                ? 'grid-cols-1'
                : 'grid-cols-2'
                }`}>
                {/* Jenis */}
                {(!Object.values(expandedCards).some(expanded => expanded) || expandedCards.jenis) && (
                    <div
                        className="bg-[#F3F4F6] rounded-2xl p-8 shadow-sm relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer"
                        style={{
                            transform: expandedCards.jenis ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: expandedCards.jenis ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            backgroundColor: expandedCards.jenis ? 'white' : '#F3F4F6',
                            border: expandedCards.jenis ? '2px solid #dbeafe' : '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            if (!expandedCards.jenis) {
                                e.target.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!expandedCards.jenis) {
                                e.target.style.transform = 'scale(1)'
                            }
                        }}
                    >
                        <div className="absolute top-6 right-6 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => toggleCard('jenis')}>
                            {expandedCards.jenis ? (
                                <Shrink className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            ) : (
                                <Expand className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            )}
                        </div>
                        <h3 className="font-bold text-2xl mb-4" style={{ color: '#274B9C' }}>Jenis</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et. Dolor in lorem aliquam vitae nulla diam elementum augue. Interdum a mauris viverra platea risus porttitor.
                            {expandedCards.jenis && (
                                <span className="inline-block animate-fadeIn">
                                    {' '}Quisque integer fringilla tellus. Accumsan nisl sit ut sapien. Fringilla mauris imperdiet ipsum quam lobortis ultrices tristique aliquam. Vestibulum nisl massa scelerisque varius morbi lacus nulla dolor. Pellentesque tellus elit ut donec. Mi arcu id et cursus duis imperdiet at. Ultrices facilisis hac in vitam varius mauris blandit vitae. Cursus id eget rhoncus non mi. Suscipit donec mattis et rhoncus ut eget suspendisse sit non. Nisl lobortis purus duis sit nec id.
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {/* Persentase */}
                {(!Object.values(expandedCards).some(expanded => expanded) || expandedCards.persentase) && (
                    <div
                        className="bg-[#F3F4F6] rounded-2xl p-8 shadow-sm relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer"
                        style={{
                            transform: expandedCards.persentase ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: expandedCards.persentase ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            backgroundColor: expandedCards.persentase ? 'white' : '#F3F4F6',
                            border: expandedCards.persentase ? '2px solid #dbeafe' : '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            if (!expandedCards.persentase) {
                                e.target.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!expandedCards.persentase) {
                                e.target.style.transform = 'scale(1)'
                            }
                        }}
                    >
                        <div className="absolute top-6 right-6 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => toggleCard('persentase')}>
                            {expandedCards.persentase ? (
                                <Shrink className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            ) : (
                                <Expand className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            )}
                        </div>
                        <h3 className="font-bold text-2xl mb-4" style={{ color: '#274B9C' }}>Persentase</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et. Dolor in lorem aliquam vitae nulla diam elementum augue. Interdum a mauris viverra platea risus porttitor.
                            {expandedCards.persentase && (
                                <span className="inline-block animate-fadeIn">
                                    {' '}Cursus porttitor integer lectus. Accumsan nisl sit ut sapien. Fringilla mauris imperdiet ipsum quam lobortis ultrices tristique aliquam. Vestibulum nisl massa scelerisque varius morbi lacus nulla dolor. Pellentesque tellus elit ut donec. Mi arcu id et cursus duis imperdiet at.
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {/* Manfaat */}
                {(!Object.values(expandedCards).some(expanded => expanded) || expandedCards.manfaat) && (
                    <div
                        className="bg-[#F3F4F6] rounded-2xl p-8 shadow-sm relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer"
                        style={{
                            transform: expandedCards.manfaat ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: expandedCards.manfaat ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            backgroundColor: expandedCards.manfaat ? 'white' : '#F3F4F6',
                            border: expandedCards.manfaat ? '2px solid #dbeafe' : '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            if (!expandedCards.manfaat) {
                                e.target.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!expandedCards.manfaat) {
                                e.target.style.transform = 'scale(1)'
                            }
                        }}
                    >
                        <div className="absolute top-6 right-6 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => toggleCard('manfaat')}>
                            {expandedCards.manfaat ? (
                                <Shrink className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            ) : (
                                <Expand className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            )}
                        </div>
                        <h3 className="font-bold text-2xl mb-4" style={{ color: '#274B9C' }}>Manfaat</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et. Dolor in lorem aliquam vitae nulla diam elementum augue. Interdum a mauris viverra platea risus porttitor.
                            {expandedCards.manfaat && (
                                <span className="inline-block animate-fadeIn">
                                    {' '}Quisque integer fringilla tellus. Accumsan nisl sit ut sapien. Fringilla mauris imperdiet ipsum quam lobortis ultrices tristique aliquam. Vestibulum nisl massa scelerisque varius morbi lacus nulla dolor. Pellentesque tellus elit ut donec. Mi arcu id et cursus duis imperdiet at. Ultrices facilisis hac in vitam varius mauris blandit vitae.
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {/* Cara menggunakan peta */}
                {(!Object.values(expandedCards).some(expanded => expanded) || expandedCards.peta) && (
                    <div
                        className="bg-[#F3F4F6] rounded-2xl p-8 shadow-sm relative transition-all duration-700 ease-in-out overflow-hidden cursor-pointer"
                        style={{
                            transform: expandedCards.peta ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: expandedCards.peta ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            backgroundColor: expandedCards.peta ? 'white' : '#F3F4F6',
                            border: expandedCards.peta ? '2px solid #dbeafe' : '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                            if (!expandedCards.peta) {
                                e.target.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!expandedCards.peta) {
                                e.target.style.transform = 'scale(1)'
                            }
                        }}
                    >
                        <div className="absolute top-6 right-6 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => toggleCard('peta')}>
                            {expandedCards.peta ? (
                                <Shrink className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            ) : (
                                <Expand className="w-6 h-6 transition-all duration-500 ease-in-out" style={{ color: '#274B9C' }} />
                            )}
                        </div>
                        <h3 className="font-bold text-2xl mb-4" style={{ color: '#274B9C' }}>Cara menggunakan peta</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et.Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id lacus orci amet tincidunt donec sit quis malesuada et
                            {expandedCards.peta && (
                                <span className="inline-block animate-fadeIn">
                                    {' '}Dolor in lorem aliquam vitae nulla diam elementum augue. Interdum a mauris viverra platea risus porttitor. Cursus porttitor integer lectus. Accumsan nisl sit ut sapien. Fringilla mauris imperdiet ipsum quam lobortis ultrices tristique aliquam. Vestibulum nisl massa scelerisque varius morbi lacus nulla dolor.
                                </span>
                            )}
                        </p>
                        <button
                            className="font-medium text-white px-6 py-3 rounded-full text-sm flex items-center space-x-2 transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#274B9C' }}
                        >
                            <span>Selengkapnya</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LamunSections