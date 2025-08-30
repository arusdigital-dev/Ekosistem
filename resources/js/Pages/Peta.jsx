import Navbar from "@/Components/Navbar";
import React, { useState } from "react";
import MapView from "@/UI/MapView";

export default function Peta() {
    const [layers, setLayers] = useState({
        mangrove: false,
        lamun: false,
        dugong: false,
    });

    // Filter:
    // - dugong: kondisi
    // - lamun : kriteria (snake_case)
    const [cond, setCond] = useState({
        mangrove: {}, // no filter
        lamun: {
            sangat_padat: false,
            padat: false,
            sedang: false,
            jarang: false,
        },
        dugong: { hidup: false, mati: false, terluka: false },
    });

    const [geom, setGeom] = useState({
        mangrove: { point: false, polygon: false },
        lamun: { point: false, polygon: false },
        dugong: { point: false, polygon: false }, // point-only; biarkan konsisten UI
    });

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const toggleLayer = (key) => (e) =>
        setLayers((prev) => ({ ...prev, [key]: e.target.checked }));

    const toggleCond = (layer, k) => (e) =>
        setCond((p) => ({
            ...p,
            [layer]: { ...p[layer], [k]: e.target.checked },
        }));

    const toggleGeom = (layer, k) => (e) =>
        setGeom((p) => ({
            ...p,
            [layer]: { ...p[layer], [k]: e.target.checked },
        }));

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

    const getConditionColor = (layer, condition) => {
        if (layer === 'dugong') {
            if (condition === 'hidup') return '#8b5cf6';
            if (condition === 'terluka') return '#eab308';
            if (condition === 'mati') return '#ef4444';
        }
        if (layer === 'lamun') {
            if (condition === 'sangat_padat') return '#1e3a8a';
            if (condition === 'padat') return '#1e40af';
            if (condition === 'sedang') return '#3b82f6';
            if (condition === 'jarang') return '#60a5fa';
        }
        return '#94a3b8';
    };

    const CondRow = ({ layer, options }) => (
        <div className="pl-6 mt-1 text-[12px] text-gray-700 space-y-1">
            {Object.keys(options).map((k) => (
                <label key={k} className="flex items-center gap-2 mr-2">
                    <input
                        type="checkbox"
                        checked={!!cond[layer][k]}
                        onChange={toggleCond(layer, k)}
                        className="accent-gray-600"
                    />
                    <Swatch color={getConditionColor(layer, k)} />
                    <span className="capitalize">{k.replace(/_/g, " ")}</span>
                </label>
            ))}
        </div>
    );

    const GeomRow = ({ layer, pointOnly = false }) => (
        <div className="pl-6 mt-1 text-[12px] text-gray-700 space-x-2">
            {!pointOnly && (
                <label className="inline-flex items-center gap-1 mr-2">
                    <input
                        type="checkbox"
                        checked={geom[layer].polygon}
                        onChange={toggleGeom(layer, "polygon")}
                        className="accent-gray-600"
                    />
                    <span>Area Kawasan</span>
                </label>
            )}
            <label className="inline-flex items-center gap-1 mr-2">
                <input
                    type="checkbox"
                    checked={geom[layer].point}
                    onChange={toggleGeom(layer, "point")}
                    className="accent-gray-600"
                />
                <span>Titik Temuan</span>
            </label>
        </div>
    );

    const Spinner = () => (
        <span
            className="inline-block align-middle ml-2"
            title={loading ? "Memuat data peta..." : ""}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
        </span>
    );

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Navbar />
            <div className="relative flex-1 w-full overflow-hidden">
                <MapView
                    visibleMangrove={layers.mangrove}
                    visibleLamun={layers.lamun}
                    visibleDugong={layers.dugong}
                    cond={cond}
                    geom={geom}
                    onLoadingChange={setLoading}
                />

                {/* Panel */}
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md size-11 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title={open ? "Sembunyikan panel" : "Tampilkan panel"}
                    >
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

                    <div
                        className={`pointer-events-auto mt-3 transition-all duration-200 origin-left ${
                            open
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
                        }`}
                    >
                        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl border border-gray-200 w-[340px] max-w-[85vw]">
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <div className="text-sm font-semibold">
                                    Katalog Layer
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                                        GIS
                                    </span>
                                    <Spinner />
                                </div>
                            </div>

                            <div className="p-4 space-y-4 text-sm">
                                {/* Mangrove */}
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={layers.mangrove}
                                            onChange={toggleLayer("mangrove")}
                                            className="accent-emerald-600"
                                        />
                                        <Swatch color="#27ae60" />
                                        <span className="truncate">
                                            Mangrove
                                        </span>
                                    </label>
                                    <GeomRow layer="mangrove" />
                                    {/* tidak ada filter kondisi untuk mangrove */}
                                </div>

                                {/* Lamun */}
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={layers.lamun}
                                            onChange={toggleLayer("lamun")}
                                            className="accent-blue-600"
                                        />
                                        <Swatch color="#3b82f6" />
                                        <span className="truncate">Lamun</span>
                                    </label>
                                    <GeomRow layer="lamun" />
                                    <CondRow
                                        layer="lamun"
                                        options={{
                                            sangat_padat: true,
                                            padat: true,
                                            sedang: true,
                                            jarang: true,
                                        }}
                                    />
                                </div>

                                {/* Dugong */}
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={layers.dugong}
                                            onChange={toggleLayer("dugong")}
                                            className="accent-yellow-500"
                                        />
                                        <Swatch color="#8b5cf6" />
                                        <span className="truncate">Dugong</span>
                                    </label>
                                    <GeomRow layer="dugong" pointOnly />
                                    <CondRow
                                        layer="dugong"
                                        options={{
                                            hidup: true,
                                            mati: true,
                                            terluka: true,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600">
                                Centang layer, pilih tipe geometri & filter.{" "}
                                {loading ? "Memuat..." : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
