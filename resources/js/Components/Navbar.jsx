import React, { useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">
                    <div className="flex items-center justify-between px-4 py-2">
                        {/* Logo */}
                        <a href="/" className="inline-flex items-center gap-2">
                            <div className="bg-blue-800 text-white px-4 py-2 rounded-full font-semibold">
                                Logo
                            </div>
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <a
                                href="/"
                                className="font-semibold text-[#274B9C]"
                            >
                                Beranda
                            </a>
                            <a
                                href="/laporan"
                                className="font-semibold text-[#274B9C]"
                            >
                                Laporan
                            </a>
                            <a
                                href="/peta"
                                className="font-semibold text-[#274B9C]"
                            >
                                Peta
                            </a>
                            <a
                                href="/publikasi"
                                className="font-semibold text-[#274B9C]"
                            >
                                Publikasi Dugong
                            </a>
                            <div className="font-semibold text-[#274B9C] cursor-default">
                                Tentang
                            </div>
                            <a
                                href="#ekosistem"
                                className="bg-blue-800 text-white px-4 py-2 rounded-full font-semibold inline-flex items-center gap-2"
                            >
                                Ekosistem Pesisir{" "}
                                <FiArrowUpRight className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg border border-gray-300"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Toggle Menu"
                        >
                            {open ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {open && (
                        <div className="md:hidden px-4 pb-4 space-y-2">
                            <a
                                href="/"
                                className="block font-semibold text-[#274B9C]"
                            >
                                Beranda
                            </a>
                            <a
                                href="/laporan"
                                className="block font-semibold text-[#274B9C]"
                            >
                                Laporan
                            </a>
                            <a
                                href="/peta"
                                className="block font-semibold text-[#274B9C]"
                            >
                                Peta
                            </a>
                            <a
                                href="/publikasi"
                                className="block font-semibold text-[#274B9C]"
                            >
                                Publikasi Dugong
                            </a>
                            <div className="block font-semibold text-[#274B9C]">
                                Tentang
                            </div>
                            <a
                                href="#ekosistem"
                                className="block text-center bg-blue-800 text-white px-4 py-2 rounded-full font-semibold"
                            >
                                Ekosistem Pesisir
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
