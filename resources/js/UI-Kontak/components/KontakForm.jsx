import React, { useState } from 'react';

/**
 * Komponen form kontak dengan validasi dan styling yang sesuai desain
 */
const KontakForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.pesan.trim()) {
      newErrors.pesan = 'Pesan harus diisi';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ nama: '', email: '', pesan: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#274B9C] mb-2">Nama</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Field */}
        <div>
          <div className="relative">
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors ${errors.nama ? 'border-b-red-500' : 'border-b-gray-300'
                }`}
            />

          </div>
        </div>

        {/* Email Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-[#274B9C]">Email</h3>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors ${errors.email ? 'border-b-red-500' : 'border-b-gray-300'
                  }`}
              />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-[#274B9C]">Judul</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Masukkan judul"
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Pesan Field */}
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-[#274B9C]">Pesan</h3>
          </div>
          <div className="relative">
            <textarea
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              placeholder="Masukkan pesan"
              rows={4}
              className={`w-full max-w-lg px-0 py-3 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors resize-vertical ${errors.pesan ? 'border-b-red-500' : 'border-b-gray-300'
                }`}
            />

          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start pt-4">
          <button
            type="submit"
            className="bg-[#274B9C] text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default KontakForm;