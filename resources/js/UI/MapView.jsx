import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * MapLibre map:
 * - OSM raster basemap
 * - 3 vector sources: mangrove, lamun, dugong
 * - Styled (sedikit dipoles, tanpa mengubah fungsi/ID layer):
 *   - mangrove: fill hijau + outline dengan ketebalan dinamis
 *   - lamun: fill biru + outline dengan ketebalan dinamis
 *   - dugong: point kuning + stroke (radius dinamis)
 * - Toggle visibility via props (awalnya semua off dari parent)
 */
export default function MapView({
    visibleMangrove = false,
    visibleLamun = false,
    visibleDugong = false,
}) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const SOURCE = {
        base: "osm",
        mangrove: "mangrove",
        lamun: "lamun",
        dugong: "dugong",
    };

    const LAYER = {
        mangroveFill: "mangrove-fill",
        mangroveLine: "mangrove-line",
        lamunFill: "lamun-fill",
        lamunLine: "lamun-line",
        dugongPoint: "dugong-point",
    };

    const setVisibility = (id, visible) => {
        const map = mapRef.current;
        if (!map || !map.getLayer(id)) return;
        map.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
    };

    useEffect(() => {
        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            center: [104.6, 1.1], // Bintan
            zoom: 9,
            style: {
                version: 8,
                sources: {
                    [SOURCE.base]: {
                        type: "raster",
                        tiles: [
                            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                        ],
                        tileSize: 256,
                        attribution:
                            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    },
                    [SOURCE.mangrove]: {
                        type: "vector",
                        tiles: [
                            "http://127.0.0.1:8000/tiles/mangrove/{z}/{x}/{y}.mvt",
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    [SOURCE.lamun]: {
                        type: "vector",
                        tiles: [
                            "http://127.0.0.1:8000/tiles/lamun/{z}/{x}/{y}.mvt",
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    [SOURCE.dugong]: {
                        type: "vector",
                        tiles: [
                            "http://127.0.0.1:8000/tiles/dugong/{z}/{x}/{y}.mvt",
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                },
                layers: [
                    { id: "osm-raster", type: "raster", source: SOURCE.base },

                    // MANGROVE (green)
                    {
                        id: LAYER.mangroveFill,
                        type: "fill",
                        source: SOURCE.mangrove,
                        "source-layer": "mangrove",
                        paint: {
                            "fill-color": "#2ecc71",
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: LAYER.mangroveLine,
                        type: "line",
                        source: SOURCE.mangrove,
                        "source-layer": "mangrove",
                        paint: {
                            "line-color": "#1e8449",
                            "line-opacity": 0.95,
                            "line-width": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                5,
                                0.6,
                                12,
                                1.6,
                                16,
                                2.8,
                            ],
                        },
                    },

                    // LAMUN (blue)
                    {
                        id: LAYER.lamunFill,
                        type: "fill",
                        source: SOURCE.lamun,
                        "source-layer": "lamun",
                        paint: {
                            "fill-color": "#3498db",
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: LAYER.lamunLine,
                        type: "line",
                        source: SOURCE.lamun,
                        "source-layer": "lamun",
                        paint: {
                            "line-color": "#21618c",
                            "line-opacity": 0.95,
                            "line-width": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                5,
                                0.6,
                                12,
                                1.6,
                                16,
                                2.8,
                            ],
                        },
                    },

                    // DUGONG (yellow points)
                    {
                        id: LAYER.dugongPoint,
                        type: "circle",
                        source: SOURCE.dugong,
                        "source-layer": "dugong",
                        paint: {
                            "circle-color": "#f1c40f",
                            "circle-radius": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                5,
                                3,
                                12,
                                6,
                                16,
                                9,
                            ],
                            "circle-opacity": 0.95,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#1f1f1f",
                            "circle-stroke-opacity": 0.9,
                        },
                    },
                ],
            },
        });

        // controls
        map.addControl(
            new maplibregl.NavigationControl({ showCompass: false }),
            "top-right"
        );
        map.addControl(
            new maplibregl.ScaleControl({ unit: "metric" }),
            "bottom-left"
        );

        // pointer & popup
        const popup = new maplibregl.Popup({
            closeButton: true,
            closeOnClick: true,
        });

        const showPopup = (title) => (e) => {
            const f = e.features?.[0];
            if (!f) return;
            const p = f.properties || {};

            let propsPretty = "";
            if (p.props) {
                try {
                    const parsed = JSON.parse(p.props);
                    propsPretty = `<pre style="margin:0;white-space:pre-wrap;max-height:200px;overflow:auto">${escapeHtml(
                        JSON.stringify(parsed, null, 2)
                    )}</pre>`;
                } catch {
                    propsPretty = `<pre style="margin:0;white-space:pre-wrap;max-height:200px;overflow:auto">${escapeHtml(
                        String(p.props)
                    )}</pre>`;
                }
            }

            const content = `
          <div style="font-size:12px;line-height:1.45">
            <div style="font-weight:700;margin-bottom:6px">${escapeHtml(
                title
            )}</div>
            ${
                p.name
                    ? `<div style="margin-bottom:2px"><strong>Nama:</strong> ${escapeHtml(
                          p.name
                      )}</div>`
                    : ""
            }
            <div style="margin-bottom:2px"><strong>ID:</strong> ${escapeHtml(
                String(p.id ?? f.id ?? "")
            )}</div>
            <div style="margin-bottom:2px"><strong>Koordinat (lon, lat):</strong> ${fmtCoord(
                e.lngLat.lng
            )}, ${fmtCoord(e.lngLat.lat)}</div>
            ${
                propsPretty
                    ? `<div style="margin-top:6px"><strong>Detail Atribut</strong><br/>${propsPretty}</div>`
                    : ""
            }
          </div>
        `;

            map.getCanvas().style.cursor = "pointer";
            popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
        };

        const hideCursor = () => (map.getCanvas().style.cursor = "");

        map.on("load", () => {
            setIsLoaded(true);
            // set visibility awal sesuai props (awal off dari parent)
            setVisibility(LAYER.mangroveFill, visibleMangrove);
            setVisibility(LAYER.mangroveLine, visibleMangrove);
            setVisibility(LAYER.lamunFill, visibleLamun);
            setVisibility(LAYER.lamunLine, visibleLamun);
            setVisibility(LAYER.dugongPoint, visibleDugong);
        });

        // click handlers
        map.on("click", LAYER.mangroveFill, showPopup("Mangrove"));
        map.on("click", LAYER.lamunFill, showPopup("Lamun"));
        map.on("click", LAYER.dugongPoint, showPopup("Dugong"));

        // hover feedback (pointer)
        [LAYER.mangroveFill, LAYER.lamunFill, LAYER.dugongPoint].forEach(
            (id) => {
                map.on(
                    "mouseenter",
                    id,
                    () => (map.getCanvas().style.cursor = "pointer")
                );
                map.on("mouseleave", id, hideCursor);
            }
        );

        mapRef.current = map;

        return () => {
            popup.remove();
            map.remove();
            mapRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // sync visibility on prop change (tidak mengubah fungsi)
    useEffect(() => {
        if (!isLoaded) return;
        setVisibility(LAYER.mangroveFill, visibleMangrove);
        setVisibility(LAYER.mangroveLine, visibleMangrove);
    }, [visibleMangrove, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        setVisibility(LAYER.lamunFill, visibleLamun);
        setVisibility(LAYER.lamunLine, visibleLamun);
    }, [visibleLamun, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        setVisibility(LAYER.dugongPoint, visibleDugong);
    }, [visibleDugong, isLoaded]);

    return (
        // penting: biarkan map mengisi parent 100%
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    );
}

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function fmtCoord(num) {
    const n = Number(num);
    if (!Number.isFinite(n)) return String(num);
    return n.toFixed(5);
}
