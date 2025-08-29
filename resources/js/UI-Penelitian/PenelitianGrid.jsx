import React from 'react';
import PenelitianCard from './components/PenelitianCard';
import { penelitiData } from './data/penelitiData';


const PenelitianGrid = () => {
  return (
    <div className="px-16 py-16 bg-white">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {penelitiData.map((peneliti) => (
          <PenelitianCard
              key={peneliti.id}
              name={peneliti.name}
              description={peneliti.description}
              image={peneliti.image}
              linkedin={peneliti.linkedin}
              instagram={peneliti.instagram}
            />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="bg-[#274B9C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e3a7a] transition-colors duration-300 shadow-lg hover:shadow-xl">
          Muat Lebih Banyak
        </button>
      </div>
    </div>
  );
};

export default PenelitianGrid;