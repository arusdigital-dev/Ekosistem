import React from 'react';

/**
 * Komponen informasi kontak dengan Lorem ipsum content
 */
const KontakInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-[#6D8FD4]">Lorem Ipsum</h2>
        </div>

        <h3 className="text-5xl font-bold text-[#274B9C] mb-4">
          Lorem ipsum dolor amet
        </h3>


      </div>

      {/* Content Section */}
      <div className="space-y-4 text-[#274B9C] leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet consectetur. In porta nec est et diam.
        </p>

        <p className="text-[#4B5563]">
          Lorem ipsum dolor sit amet consectetur. Nunc nisl quisque ante tellus tellus sodales. Ultricies velit enim arcu vestibulum nunc pretium volutpat. Id consectetur mauris sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et. Dolor in lorem aliquam vitae nulla diam elementum augue. Interdum a mauris viverra platea risus porttitor.
        </p>
      </div>


    </div>
  );
};

export default KontakInfo;