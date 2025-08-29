import React from 'react';

/**
 * Komponen header untuk halaman kontak dengan breadcrumb dan judul
 */
const KontakHeader = () => {
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="px-16 mt-36">
        <div className="flex items-center space-x-2 text-sm font-bold">
          <a href="/" className="text-[#6D8FD4] hover:underline">Tentang</a>
          <span className="text-gray-400">→</span>
          <span className="text-[#274B9C]">Kontak</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 py-8">

        {/* Header Content */}
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block text-[#6D8FD4] text-md px-3 py-1 rounded-full font-semibold">
              Tertarik dengan penelitian kami
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#274B9C] mb-4">
            Mari terhubung untuk menjaga laut
          </h1>

          <p className="text-[#4B5563] max-w-2xl mx-auto leading-relaxed font-semibold text-xs">
            Kami senang berbagi informasi dan menjawab pertanyaan seputar penelitian dan proyek kami
          </p>


        </div>
      </div>
    </div>
  );
};

export default KontakHeader;