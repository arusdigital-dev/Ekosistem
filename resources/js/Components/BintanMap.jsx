import React, { useCallback, useEffect, useMemo, useState } from "react";
import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import * as MaplibreTerradrawControl from "@watergis/maplibre-gl-terradraw";
import "@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css";

/**
 * Props:
 * - onGeometryChange?: (geom|null) => void   // kirim Geometry GeoJSON terakhir
 */
export default function BintanMap({ onGeometryChange }) {
    const [mlMap, setMlMap] = useState(null); // maplibre Map (asli)
    const [drawControl, setDrawControl] = useState(null);
    const [terra, setTerra] = useState(null); // TerraDraw instance

    // OSM raster style
    const OSM_STYLE = useMemo(
        () => ({
            version: 8,
            sources: {
                osm: {
                    type: "raster",
                    tiles: [
                        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    ],
                    tileSize: 256,
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                },
            },
            layers: [
                {
                    id: "osm",
                    type: "raster",
                    source: "osm",
                    minzoom: 0,
                    maxzoom: 19,
                },
            ],
        }),
        []
    );

    // Bintan bounds & max bounds
    const BINTAN_BOUNDS = useMemo(
        () => [
            [104.3, 0.9],
            [104.8, 1.3],
        ],
        []
    );
    const MAX_BOUNDS = useMemo(
        () => [
            [104.0, 0.7],
            [105.0, 1.5],
        ],
        []
    );

    // Handy: update parent when features change
    const pushLastGeometry = useCallback(
        (features) => {
            const lastGeom = features?.length
                ? features[features.length - 1]?.geometry
                : null;
            onGeometryChange?.(lastGeom || null);
        },
        [onGeometryChange]
    );

    // onLoad => simpan MapLibre Map, fit ke Bintan, tambah TerraDraw control
    const handleLoad = useCallback(
        (ev) => {
            const map = ev.target; // MapLibre Map instance dari react-map-gl
            setMlMap(map);

            // fokus Bintan
            map.fitBounds(BINTAN_BOUNDS, { padding: 40, duration: 0 });
            map.setMaxBounds(MAX_BOUNDS);

            // pasang TerraDraw control (modes seperti request)
            const ctrl = new MaplibreTerradrawControl.MaplibreTerradrawControl({
                modes: [
                    "point",
                    "linestring",
                    "polygon",
                    "rectangle",

                    "delete-selection",
                    "delete",
                ],
                open: true,
            });
            map.addControl(ctrl, "top-left");
            setDrawControl(ctrl);

            const td = ctrl.getTerraDrawInstance();
            setTerra(td);

            const update = () => {
                const snapshot = td?.getSnapshot?.() || [];
                pushLastGeometry(snapshot);
            };

            td?.on?.("change", update);
            td?.on?.("select", update);
            update();
        },
        [BINTAN_BOUNDS, MAX_BOUNDS, pushLastGeometry]
    );

    // cleanup when unmount
    useEffect(() => {
        return () => {
            try {
                if (mlMap && drawControl) {
                    mlMap.removeControl(drawControl);
                }
            } catch {}
        };
    }, [mlMap, drawControl]);

    // actions
    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation || !terra || !mlMap) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lng = pos.coords.longitude;
                const lat = pos.coords.latitude;
                mlMap.easeTo({ center: [lng, lat], zoom: 14, duration: 600 });

                // tambah Point ke TerraDraw (sesuai docs: addFeatures via TerraDraw instance)
                // ref: getTerraDrawInstance() + addFeatures() :contentReference[oaicite:1]{index=1}
                terra.clear?.();
                terra.addFeatures?.([
                    {
                        id: `point-${Date.now()}`,
                        type: "Feature",
                        geometry: { type: "Point", coordinates: [lng, lat] },
                        properties: { mode: "point" },
                    },
                ]);
                const snapshot = terra.getSnapshot?.() || [];
                pushLastGeometry(snapshot);
            },
            () => {},
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleClear = () => {
        terra?.clear?.();
        onGeometryChange?.(null);
    };

    return (
        <div className="rounded-2xl shadow-sm border bg-white overflow-hidden">
            <div className="px-4 py-3 border-b flex flex-wrap items-center gap-3">
                <div className="text-slate-700 font-medium">
                    Peta Pulau Bintan
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                        Lokasi Saat Ini
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                        Bersihkan
                    </button>
                </div>
            </div>

            <div className="relative h-[420px] md:h-[520px]">
                <Map
                    onLoad={handleLoad}
                    initialViewState={{
                        longitude: 104.55,
                        latitude: 1.1,
                        zoom: 9,
                    }}
                    mapStyle={OSM_STYLE}
                    style={{ width: "100%", height: "100%" }}
                >
                    <NavigationControl position="top-right" />
                    <ScaleControl position="bottom-left" />
                </Map>
            </div>
        </div>
    );
}
