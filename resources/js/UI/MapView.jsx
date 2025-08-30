import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapView({
    visibleMangrove = false,
    visibleLamun = false,
    visibleDugong = false,
    cond = {},
    geom = {},
    onLoadingChange = () => {},
}) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [legendOpen, setLegendOpen] = useState(false);

    // debounce kecil
    const useDebounced = (val, delay = 120) => {
        const [v, setV] = useState(val);
        useEffect(() => {
            const t = setTimeout(() => setV(val), delay);
            return () => clearTimeout(t);
        }, [val, delay]);
        return v;
    };
    const dVis = useDebounced(
        { visibleMangrove, visibleLamun, visibleDugong },
        120
    );
    const dCond = useDebounced(cond, 120);
    const dGeom = useDebounced(geom, 120);

    const TILE_URL = (layer) =>
        `http://127.0.0.1:8000/tiles/${layer}/{z}/{x}/{y}.mvt`;

    // Sumber & layer id
    const SRC = {
        baseOSM: "src-base-osm",
        mg: "src-mg",
        lm: "src-lm",
        dg: "src-dg",
    };
    const L = {
        baseOSM: "ly-base-osm",
        mgFill: "ly-mg-fill",
        mgLine: "ly-mg-line",
        mgPoint: "ly-mg-point",
        lmFill: "ly-lm-fill",
        lmLine: "ly-lm-line",
        lmPoint: "ly-lm-point",
        dgPoint: "ly-dg-point",
    };

    const attachLoading = (map) => {
        let pending = 0;
        const setL = (v) => onLoadingChange(!!v);
        const inc = () => {
            pending++;
            setL(true);
        };
        const dec = () => {
            pending = Math.max(0, pending - 1);
            if (pending === 0) setL(false);
        };
        const idle = () => {
            pending = 0;
            setL(false);
        };
        map.on("dataloading", inc);
        map.on("data", dec);
        map.on("idle", idle);
        return () => {
            map.off("dataloading", inc);
            map.off("data", dec);
            map.off("idle", idle);
        };
    };

    // ekspresi maplibre
    const bothPoly = [
        "any",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["geometry-type"], "MultiPolygon"],
    ];
    const bothPoint = [
        "any",
        ["==", ["geometry-type"], "Point"],
        ["==", ["geometry-type"], "MultiPoint"],
    ];

    // Filter dugong berdasarkan 'kondisi' (top-level, disuplai backend)
    const makeCondFilterDugong = (allowed) => {
        if (!allowed || allowed.length === 0) return true;
        return [
            "in",
            ["coalesce", ["get", "kondisi"], ""],
            ["literal", allowed],
        ];
    };

    // Filter lamun berdasarkan 'kriteria' (snake_case, disuplai backend)
    const makeKriteriaFilterLamun = (allowedKeys) => {
        if (!allowedKeys || allowedKeys.length === 0) return true;
        return [
            "in",
            ["coalesce", ["get", "kriteria"], ""],
            ["literal", allowedKeys],
        ];
    };

    // warna
    const mgColor = (isPoint = false) => (isPoint ? "#27ae60" : "#2ecc71"); // Mangrove tetap hijau

    const lmColor = (isPoint = false) => [
        "match",
        ["coalesce", ["get", "kriteria"], ""],
        "sangat_padat",
        isPoint ? "#3338A0" : "#3338A0",
        "padat",
        isPoint ? "#2F7FFF" : "#2F7FFF",
        "sedang",
        isPoint ? "#00809D" : "#00809D",
        "jarang",
        isPoint ? "#33A1E0" : "#33A1E0",
        /* default */ isPoint ? "#94a3b8" : "#cbd5e1",
    ];

    const dgColor = () => [
        "match",
        ["coalesce", ["get", "kondisi"], ""],
        "hidup",
        "#8b5cf6", // Ungu
        "terluka",
        "#eab308", // Kuning
        "mati",
        "#ef4444", // Merah
        /* default */ "#94a3b8",
    ];

    const setVisible = (id, vis) => {
        const m = mapRef.current;
        if (!m || !m.getLayer(id)) return;
        m.setLayoutProperty(id, "visibility", vis ? "visible" : "none");
    };
    const setFilter = (id, filterExprOrTrue) => {
        const m = mapRef.current;
        if (!m || !m.getLayer(id)) return;
        if (filterExprOrTrue === true) {
            m.setFilter(id, null);
            return;
        }
        m.setFilter(id, filterExprOrTrue);
    };

    useEffect(() => {
        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            center: [104.6, 1.1],
            zoom: 9,
            style: {
                version: 8,
                sources: {
                    // OSM only
                    [SRC.baseOSM]: {
                        type: "raster",
                        tiles: [
                            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                        ],
                        tileSize: 256,
                        attribution: "© OpenStreetMap contributors",
                    },
                    // Vector MVT
                    [SRC.mg]: {
                        type: "vector",
                        tiles: [TILE_URL("mangrove")],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    [SRC.lm]: {
                        type: "vector",
                        tiles: [TILE_URL("lamun")],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    [SRC.dg]: {
                        type: "vector",
                        tiles: [TILE_URL("dugong")],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                },
                layers: [
                    // Basemap OSM ON
                    {
                        id: L.baseOSM,
                        type: "raster",
                        source: SRC.baseOSM,
                        layout: { visibility: "visible" },
                    },

                    // Mangrove
                    {
                        id: L.mgFill,
                        type: "fill",
                        source: SRC.mg,
                        "source-layer": "mangrove",
                        paint: {
                            "fill-color": mgColor(false),
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: L.mgLine,
                        type: "line",
                        source: SRC.mg,
                        "source-layer": "mangrove",
                        paint: {
                            "line-color": "#27ae60",
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
                    {
                        id: L.mgPoint,
                        type: "circle",
                        source: SRC.mg,
                        "source-layer": "mangrove",
                        paint: {
                            "circle-color": mgColor(true),
                            "circle-radius": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                5,
                                3,
                                12,
                                6,
                                16,
                                8,
                            ],
                            "circle-opacity": 0.95,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#1e4620",
                            "circle-stroke-opacity": 0.9,
                        },
                    },

                    // Lamun
                    {
                        id: L.lmFill,
                        type: "fill",
                        source: SRC.lm,
                        "source-layer": "lamun",
                        paint: {
                            "fill-color": lmColor(false),
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: L.lmLine,
                        type: "line",
                        source: SRC.lm,
                        "source-layer": "lamun",
                        paint: {
                            "line-color": "#1e40af",
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
                    {
                        id: L.lmPoint,
                        type: "circle",
                        source: SRC.lm,
                        "source-layer": "lamun",
                        paint: {
                            "circle-color": lmColor(true),
                            "circle-radius": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                5,
                                3,
                                12,
                                6,
                                16,
                                8,
                            ],
                            "circle-opacity": 0.95,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#1e3a8a",
                            "circle-stroke-opacity": 0.9,
                        },
                    },

                    // Dugong
                    {
                        id: L.dgPoint,
                        type: "circle",
                        source: SRC.dg,
                        "source-layer": "dugong",
                        paint: {
                            "circle-color": dgColor(),
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
                            "circle-stroke-color": "#374151",
                            "circle-stroke-opacity": 0.9,
                        },
                    },
                ],
            },
        });

        map.addControl(
            new maplibregl.NavigationControl({ showCompass: false }),
            "top-right"
        );
        map.addControl(
            new maplibregl.ScaleControl({ unit: "metric" }),
            "bottom-left"
        );

        const detach = attachLoading(map);
        map.on("load", () => setIsLoaded(true));

        // ===== inject CSS kecil untuk popup
        if (!document.getElementById("gx-one-popup-style")) {
            const style = document.createElement("style");
            style.id = "gx-one-popup-style";
            style.textContent = `
        .maplibregl-popup.gx-one .maplibregl-popup-content{
          background:#ffffff; color:#111827; border:1px solid #E5E7EB;
          border-radius:12px; box-shadow:0 10px 24px rgba(0,0,0,.08);
          padding:14px 16px; min-width:220px; max-width:320px;
        }
        .gx-badge{
          display:inline-flex;align-items:center;gap:8px;
          padding:10px 14px;border-radius:9999px;
          font-size:13px;font-weight:800;line-height:1;border:1px solid;
        }
        .gx-dot{width:8px;height:8px;border-radius:9999px;display:inline-block}
        .gx-title{font-weight:700;font-size:13px;margin-bottom:8px;opacity:.9}
      `;
            document.head.appendChild(style);
        }

        const popup = new maplibregl.Popup({
            closeButton: true,
            closeOnClick: true,
            className: "gx-one",
            maxWidth: "320px",
        });

        const safeJson = (raw) => {
            if (!raw) return {};
            if (typeof raw === "object") return raw;
            try {
                return JSON.parse(raw);
            } catch {
                return {};
            }
        };

        // Ambil label: kondisi (dugong) atau kriteria (lamun)
        const getLabel = (f) => {
            const p = f.properties || {};
            const props = safeJson(p.props);
            const raw = String(
                p.kondisi ??
                    props.condition ??
                    p.kriteria ??
                    props.Kriteria ??
                    "n/a"
            ).toLowerCase();
            if (raw.includes("hidup")) return "hidup";
            if (raw.includes("terluka")) return "terluka";
            if (raw.includes("mati")) return "mati";
            const k = String(p.kriteria ?? "").toLowerCase();
            if (k) return k.replace(/_/g, " ");
            return "n/a";
        };

        const tone = (k) => {
            // Dugong colors
            if (k.includes("hidup"))
                return { bg: "#F3E8FF", fg: "#581C87", bd: "#8b5cf6" };
            if (k.includes("terluka"))
                return { bg: "#FEF3C7", fg: "#92400E", bd: "#eab308" };
            if (k.includes("mati"))
                return { bg: "#FEF2F2", fg: "#7F1D1D", bd: "#ef4444" };

            // Lamun colors
            // Lamun colors
            if (k.includes("sangat padat"))
                return { bg: "#E7F4E7", fg: "##3338A0", bd: "##3338A0" };
            if (k.includes("padat"))
                return { bg: "#E8F0FF", fg: "#2F7FFF", bd: "#2F7FFF" };
            if (k.includes("sedang"))
                return { bg: "#E8E9FF", fg: "#00809D", bd: "#00809D" };
            if (k.includes("jarang"))
                return { bg: "#E6F7FD", fg: "#155E75", bd: "#33A1E0" };

            return { bg: "#F3F4F6", fg: "#374151", bd: "#D1D5DB" };
        };

        const htmlBadge = (title, text) => {
            const c = tone(text);
            return `
        <div>
          <div class="gx-title">${escapeHtml(title)}</div>
          <div style="display:flex;justify-content:center;align-items:center">
            <span class="gx-badge" style="background:${c.bg};color:${
                c.fg
            };border-color:${c.bd}">
              <span class="gx-dot" style="background:${c.bd}"></span>
              <span style="text-transform:uppercase;letter-spacing:.6px">${escapeHtml(
                  text
              )}</span>
            </span>
          </div>
        </div>`;
        };

        const showPopup = (title) => (e) => {
            const f = e.features?.[0];
            if (!f) return;
            const label = getLabel(f);
            map.getCanvas().style.cursor = "pointer";
            popup
                .setLngLat(e.lngLat)
                .setHTML(htmlBadge(title, label))
                .addTo(map);
        };
        const hideCursor = () => (map.getCanvas().style.cursor = "");

        // Click/hover binding
        map.on("click", L.mgFill, showPopup("Kawasan Area Mangrove"));
        map.on("click", L.mgPoint, showPopup("Titik Temuan Mangrove"));
        map.on("click", L.lmFill, showPopup("Kawasan Area Lamun"));
        map.on("click", L.lmPoint, showPopup("Titik Temuan Lamun"));
        map.on("click", L.dgPoint, showPopup("Titik Temuan Dugong"));
        [L.mgFill, L.mgPoint, L.lmFill, L.lmPoint, L.dgPoint].forEach((id) => {
            map.on(
                "mouseenter",
                id,
                () => (map.getCanvas().style.cursor = "pointer")
            );
            map.on("mouseleave", id, hideCursor);
        });

        mapRef.current = map;
        return () => {
            popup.remove();
            detach?.();
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // apply visibility + filter
    useEffect(() => {
        if (!isLoaded) return;

        const condList = (layer) =>
            Object.entries(dCond?.[layer] || {})
                .filter(([, v]) => v)
                .map(([k]) => k);

        // Mangrove
        setVisible(
            L.mgFill,
            dVis.visibleMangrove && !!dGeom?.mangrove?.polygon
        );
        setVisible(
            L.mgLine,
            dVis.visibleMangrove && !!dGeom?.mangrove?.polygon
        );

        setVisible(L.mgPoint, false);
        setFilter(L.mgFill, ["all", bothPoly, true]);
        setFilter(L.mgLine, ["all", bothPoly, true]);
        setFilter(L.mgPoint, ["all", bothPoint, true]);

        // Lamun → filter kriteria (snake_case)
        const lmAllowed = condList("lamun");
        const lmF = makeKriteriaFilterLamun(lmAllowed);
        setVisible(L.lmFill, dVis.visibleLamun && !!dGeom?.lamun?.polygon);
        setVisible(L.lmLine, dVis.visibleLamun && !!dGeom?.lamun?.polygon);

        setVisible(L.lmPoint, false);
        setFilter(L.lmFill, ["all", bothPoly, lmF]);
        setFilter(L.lmLine, ["all", bothPoly, lmF]);
        setFilter(L.lmPoint, ["all", bothPoint, lmF]);

        // Dugong → filter kondisi
        const dgAllowed = condList("dugong");
        const dgF = makeCondFilterDugong(dgAllowed);
        setVisible(L.dgPoint, dVis.visibleDugong && !!dGeom?.dugong?.point);
        setFilter(L.dgPoint, ["all", bothPoint, dgF]);
    }, [isLoaded, dVis, dCond, dGeom]);

    // Check if any layer is visible for legend
    const hasActiveLayers = visibleMangrove || visibleLamun || visibleDugong;

    const LegendItem = ({ color, label }) => (
        <div className="flex items-center gap-2 text-xs">
            <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{ backgroundColor: color }}
            />
            <span className="text-gray-700">{label}</span>
        </div>
    );

    const Legend = () => {
        if (!hasActiveLayers) return null;

        return (
            <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
                {/* Toggle button for small screens */}
                <div className="md:hidden">
                    <button
                        onClick={() => setLegendOpen(!legendOpen)}
                        className="mb-2 w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-shadow"
                        title={legendOpen ? "Tutup legenda" : "Buka legenda"}
                    >
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${
                                legendOpen ? "rotate-90" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Legend content */}
                <div
                    className={`bg-white/95 backdrop-blur rounded-lg shadow-xl border border-gray-200 p-3 min-w-[180px] transition-all duration-200 md:opacity-100 md:scale-100 md:pointer-events-auto ${
                        legendOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                    <div className="text-sm font-semibold text-gray-800 mb-2">
                        Legenda
                    </div>
                    <div className="space-y-2">
                        {visibleMangrove && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-1">
                                    Mangrove
                                </div>
                                <LegendItem
                                    color="#27ae60"
                                    label="Area Mangrove"
                                />
                            </div>
                        )}

                        {visibleLamun && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-1">
                                    Lamun
                                </div>
                                <div className="space-y-1 pl-2">
                                    <LegendItem
                                        color="#3338A0"
                                        label="Sangat Padat"
                                    />
                                    <LegendItem color="#2F7FFF" label="Padat" />
                                    <LegendItem
                                        color="#00809D"
                                        label="Sedang"
                                    />
                                    <LegendItem
                                        color="#33A1E0"
                                        label="Jarang"
                                    />
                                </div>
                            </div>
                        )}

                        {visibleDugong && (
                            <div>
                                <div className="text-xs font-medium text-gray-600 mb-1">
                                    Dugong
                                </div>
                                <div className="space-y-1 pl-2">
                                    <LegendItem color="#8b5cf6" label="Hidup" />
                                    <LegendItem
                                        color="#eab308"
                                        label="Terluka"
                                    />
                                    <LegendItem color="#ef4444" label="Mati" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full">
            <div
                ref={mapContainerRef}
                style={{ width: "100%", height: "100%" }}
            />
            <Legend />
        </div>
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
