import React from 'react';
import KontakHeader from './components/KontakHeader';
import KontakInfo from './components/KontakInfo';
import KontakForm from './components/KontakForm';
import Navbar from '@/Components/Navbar';


const KontakPage = () => {
  return (
    <div className="bg-white">
      <div className="absolute top-6 left-0 right-0 z-20">
        <Navbar currentPage="Kontak" />
      </div>
      {/* Header Section */}
      <KontakHeader />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information */}
          <div>
            <KontakInfo />
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <KontakForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakPage;