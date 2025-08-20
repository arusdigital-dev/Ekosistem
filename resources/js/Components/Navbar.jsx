import React from "react";
import Background from "../images/Hero.png";
import { FiArrowUpRight } from "react-icons/fi";
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-10 py-3 bg-[#F3F4F6] backdrop-blur-sm rounded-full my-3 max-w-6xl mx-auto">
            {/* Logo */}
            <div className="bg-blue-800 text-white px-6 py-2 rounded-full font-inter font-bold">
                Logo
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center space-x-12">
                {/* Language Selector */}
                <div className="flex items-center space-x-1">
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHk9IjkiIHdpZHRoPSIyNCIgaGVpZ2h0PSI5IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo="
                        alt="ID"
                        className="w-6 h-4"
                    />
                    <span
                        className="text-sm font-inter font-bold"
                        style={{ color: "#274B9C" }}
                    >
                        Id
                    </span>
                    <svg
                        className="w-4 h-4"
                        style={{ color: "#274B9C" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Menu Items */}
                <a
                    href="#"
                    className="font-inter font-bold"
                    style={{ color: "#274B9C" }}
                >
                    Beranda
                </a>
                <a
                    href="#"
                    className="font-inter font-bold"
                    style={{ color: "#274B9C" }}
                >
                    Peta
                </a>
                <a
                    href="#"
                    className="font-inter font-bold"
                    style={{ color: "#274B9C" }}
                >
                    Publikasi Dungong
                </a>

                {/* Dropdown Items */}

                <div className="flex items-center space-x-1">
                    <a
                        href="#"
                        className="font-inter font-bold"
                        style={{ color: "#274B9C" }}
                    >
                        Tentang
                    </a>
                    <svg
                        className="w-4 h-4"
                        style={{ color: "#274B9C" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="bg-blue-800 text-white px-6 py-2 rounded-full font-inter font-bold flex items-center">
                    Ekosistem Pesisir
                    <FiArrowUpRight className="h-5 w-5" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
