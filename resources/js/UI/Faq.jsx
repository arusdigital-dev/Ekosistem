import React, { useState } from 'react';

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Apa itu mangrove dan mengapa penting bagi lingkungan?",
            answer: "Mangrove adalah ekosistem hutan yang tumbuh di daerah pesisir tropis dan subtropis. Mangrove sangat penting karena berfungsi sebagai pelindung pantai dari abrasi, habitat berbagai spesies, dan penyerap karbon yang efektif."
        },
        {
            question: "Apa saja kegiatan konservasi yang dilakukan tim ini?",
            answer: "Tim kami melakukan berbagai kegiatan konservasi seperti penanaman mangrove, monitoring ekosistem, edukasi masyarakat, dan penelitian ilmiah untuk menjaga kelestarian mangrove."
        },
        {
            question: "Apa perbedaan padang lamun dan rumput laut di laut kita?",
            answer: "Padang lamun adalah tumbuhan berbunga yang hidup di dasar laut dangkal, sedangkan rumput laut adalah alga yang dapat hidup di berbagai kedalaman. Keduanya memiliki peran penting dalam ekosistem laut."
        },
        {
            question: "Bagaimana cara ikut serta dalam kegiatan konservasi?",
            answer: "Anda dapat bergabung dengan program volunteer kami, mengikuti kegiatan penanaman mangrove, atau berpartisipasi dalam program edukasi dan penelitian yang kami selenggarakan."
        },
        {
            question: "Mengapa dugong masuk kategori satwa yang dilindungi?",
            answer: "Dugong masuk kategori satwa dilindungi karena populasinya yang terus menurun akibat perburuan, kerusakan habitat, dan polusi laut. Dugong juga memiliki peran penting dalam menjaga ekosistem padang lamun."
        },
        {
            question: "Apakah ada program edukasi untuk sekolah atau komunitas?",
            answer: "Ya, kami memiliki program edukasi khusus untuk sekolah dan komunitas yang mencakup workshop, kunjungan lapangan, dan materi pembelajaran tentang konservasi laut dan mangrove."
        },
        {
            question: "Bagaimana ekosistem mangrove dan lamun saling berhubungan?",
            answer: "Ekosistem mangrove dan padang lamun saling terhubung dalam rantai makanan dan siklus nutrisi. Mangrove menyediakan nutrisi untuk padang lamun, sementara padang lamun menjadi nursery ground untuk berbagai spesies ikan."
        },
        {
            question: "Bagaimana cara kami mendapatkan laporan kegiatan terbaru?",
            answer: "Anda dapat mengakses laporan kegiatan terbaru melalui website kami, media sosial, atau berlangganan newsletter untuk mendapatkan update rutin tentang program konservasi yang sedang berjalan."
        }
    ];

    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-sm font-bold mb-2" style={{ color: '#6D8FD4' }}>
                        Dukungan & Informasi
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#274B9C' }}>
                        Pertanyaan yang sering diajukan
                    </h2>
                    <p className="text-[#274B9C] max-w-2xl mx-auto font-bold">
                        Temukan jawaban atas pertanyaan seputar mangrove, padang lamun, dugong, dan kegiatan konservasi kami.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-white border-b" style={{ borderBottomColor: '#274B9C', borderBottomWidth: '1px' }}>
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full p-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span
                                    className="font-semibold text-sm md:text-base pr-4 leading-relaxed"
                                    style={{ color: '#274B9C' }}
                                >
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-in-out ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    style={{ color: '#274B9C' }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;