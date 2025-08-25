import Navbar from "@/Components/Navbar";
import React, { useState } from "react";
import MapView from "@/UI/MapView";

/**
 * Perubahan utama:
 * - Peta full-screen area (mengisi tinggi viewport di bawah Navbar).
 * - Katalog Layer jadi card mengambang (absolute) di tengah sisi kiri.
 * - Responsif + tombol hamburger untuk buka/tutup panel.
 * - Default: semua layer TIDAK tercentang saat load pertama.
 * - Tidak mengubah logika peta / sumber / layer—hanya UI/UX.
 */
export default function Peta() {
    // toggle layer (DEFAULT: semua OFF sesuai permintaan)
    const [layers, setLayers] = useState({
        mangrove: false,
        lamun: false,
        dugong: false,
    });

    // state untuk panel katalog layer (open/close)
    const [open, setOpen] = useState(true);

    const toggle = (key) => (e) =>
        setLayers((prev) => ({ ...prev, [key]: e.target.checked }));

    const Swatch = ({ color }) => (
        <span
            style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: 3,
                background: color,
                border: "1px solid rgba(0,0,0,0.2)",
                marginRight: 8,
            }}
        />
    );

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Navbar />

            {/* Wrapper peta: tinggi = tinggi layar - tinggi navbar (64px) */}
            <div className="relative flex-1 w-full overflow-hidden">
                {/* Kanvas peta mengisi penuh wrapper */}
                <MapView
                    visibleMangrove={layers.mangrove}
                    visibleLamun={layers.lamun}
                    visibleDugong={layers.dugong}
                />

                {/* Panel Katalog Layer (absolute, tengah sisi kiri) */}
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    {/* Tombol Hamburger (selalu tampil). pointer-events perlu ON di tombol */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md size-11 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title={open ? "Sembunyikan panel" : "Tampilkan panel"}
                    >
                        {/* ikon hamburger */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Card Panel */}
                    <div
                        className={`pointer-events-auto mt-3 transition-all duration-200 origin-left ${
                            open
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
                        }`}
                    >
                        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl border border-gray-200 w-[280px] max-w-[80vw]">
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <div className="text-sm font-semibold">
                                    Katalog Layer
                                </div>
                                {/* badge kecil style portal GIS */}
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                                    GIS
                                </span>
                            </div>

                            <div className="p-4 space-y-3 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={layers.mangrove}
                                        onChange={toggle("mangrove")}
                                        className="accent-emerald-600"
                                    />
                                    <Swatch color="#2ecc71" />
                                    <span className="truncate">
                                        Mangrove (MultiPolygon)
                                    </span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={layers.lamun}
                                        onChange={toggle("lamun")}
                                        className="accent-blue-600"
                                    />
                                    <Swatch color="#3498db" />
                                    <span className="truncate">
                                        Lamun (MultiPolygon)
                                    </span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={layers.dugong}
                                        onChange={toggle("dugong")}
                                        className="accent-yellow-500"
                                    />
                                    <Swatch color="#f1c40f" />
                                    <span className="truncate">
                                        Dugong (Point)
                                    </span>
                                </label>
                            </div>

                            {/* footer mini legend / hint */}
                            <div className="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600">
                                Centang layer untuk menampilkan geometri di
                                peta.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
