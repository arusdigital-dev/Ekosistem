import Navbar from "@/Components/Navbar";
import React, { useState } from "react";
import MapView from "@/UI/MapView";

export default function Peta() {
    // toggle layer (default semua nyala)
    const [layers, setLayers] = useState({
        mangrove: true,
        lamun: true,
        dugong: true,
    });

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
        <div className="w-full min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar: katalog layer + legend */}
                <aside className="w-72 border-r border-gray-200 p-4 space-y-4">
                    <h2 className="text-lg font-semibold">Katalog Layer</h2>

                    <div className="space-y-3 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={layers.mangrove}
                                onChange={toggle("mangrove")}
                            />
                            <Swatch color="#2ecc71" />
                            <span>Mangrove (MultiPolygon)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={layers.lamun}
                                onChange={toggle("lamun")}
                            />
                            <Swatch color="#3498db" />
                            <span>Lamun (MultiPolygon)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={layers.dugong}
                                onChange={toggle("dugong")}
                            />
                            <Swatch color="#f1c40f" />
                            <span>Dugong (Point)</span>
                        </label>
                    </div>

                    <div className="mt-6 text-xs text-gray-500 space-y-1">
                        <p>
                            • Vector tiles:{" "}
                            <code>
                                /tiles/&lt;layer&gt;/{"{z}/{x}/{y}"}.mvt
                            </code>
                        </p>
                        <p>• Pusat: Bintan (104.6, 1.1)</p>
                        <p>
                            • Tampilkan hanya 3 layer: mangrove, lamun, dugong
                        </p>
                    </div>
                </aside>

                {/* Kanvas peta */}
                <main className="flex-1">
                    <MapView
                        visibleMangrove={layers.mangrove}
                        visibleLamun={layers.lamun}
                        visibleDugong={layers.dugong}
                    />
                </main>
            </div>
        </div>
    );
}
