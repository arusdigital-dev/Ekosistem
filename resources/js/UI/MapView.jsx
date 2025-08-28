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

    // debounce agar banyak toggle dibatch
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

    const SRC = { base: "osm", mg: "src-mg", lm: "src-lm", dg: "src-dg" };
    const L = {
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

    // filters & colors
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
    const makeCondFilter = (allowed) => {
        if (!allowed || allowed.length === 0) return true; // no filter
        return [
            "in",
            ["coalesce", ["get", "kondisi"], ""],
            ["literal", allowed],
        ];
    };
    const mgColor = (isPoint = false) => [
        "match",
        ["coalesce", ["get", "kondisi"], ""],
        "hidup",
        isPoint ? "#2ecc71" : "#27ae60",
        "mati",
        isPoint ? "#e74c3c" : "#c0392b",
        /* default */ isPoint ? "#95a5a6" : "#7f8c8d",
    ];
    const lmColor = (isPoint = false) => [
        "match",
        ["coalesce", ["get", "kondisi"], ""],
        "hidup",
        isPoint ? "#3498db" : "#2980b9",
        "mati",
        isPoint ? "#e74c3c" : "#c0392b",
        /* default */ isPoint ? "#95a5a6" : "#7f8c8d",
    ];
    const dgColor = () => [
        "match",
        ["coalesce", ["get", "kondisi"], ""],
        "hidup",
        "#2ecc71",
        "terluka",
        "#f39c12",
        "mati",
        "#e74c3c",
        /* default */ "#95a5a6",
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
                    [SRC.base]: {
                        type: "raster",
                        tiles: [
                            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                        ],
                        tileSize: 256,
                        attribution:
                            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    },
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
                    { id: "osm", type: "raster", source: SRC.base },

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
                            "circle-stroke-color": "#145a32",
                            "circle-stroke-opacity": 0.9,
                        },
                    },

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
                            "line-color": "#1f5f85",
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
                            "circle-stroke-color": "#154360",
                            "circle-stroke-opacity": 0.9,
                        },
                    },

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
                            "circle-stroke-color": "#1f1f1f",
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

        // popup
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
                    propsPretty = `<pre style="margin:0;white-space:pre-wrap;max-height:200px;overflow:auto">${escapeHtml(
                        JSON.stringify(JSON.parse(p.props), null, 2)
                    )}</pre>`;
                } catch {
                    propsPretty = `<pre style="margin:0;white-space:pre-wrap;max-height:200px;overflow:auto">${escapeHtml(
                        String(p.props)
                    )}</pre>`;
                }
            }
            const html = `
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
          <div style="margin-bottom:2px"><strong>Koordinat (lon, lat):</strong> ${fmt(
              e.lngLat.lng
          )}, ${fmt(e.lngLat.lat)}</div>
          ${
              propsPretty
                  ? `<div style="margin-top:6px"><strong>Detail Atribut</strong><br/>${propsPretty}</div>`
                  : ""
          }
        </div>`;
            map.getCanvas().style.cursor = "pointer";
            popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
        };
        const hideCursor = () => (map.getCanvas().style.cursor = "");

        map.on("click", L.mgFill, showPopup("Mangrove (Kawasan)"));
        map.on("click", L.mgPoint, showPopup("Mangrove (Titik)"));
        map.on("click", L.lmFill, showPopup("Lamun (Kawasan)"));
        map.on("click", L.lmPoint, showPopup("Lamun (Titik)"));
        map.on("click", L.dgPoint, showPopup("Dugong (Titik)"));

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

    // apply visibility + filter saat state berubah (debounced)
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
        setVisible(L.mgPoint, dVis.visibleMangrove && !!dGeom?.mangrove?.point);
        const mgF = makeCondFilter(condList("mangrove"));
        setFilter(L.mgFill, ["all", bothPoly, mgF]);
        setFilter(L.mgLine, ["all", bothPoly, mgF]);
        setFilter(L.mgPoint, ["all", bothPoint, mgF]);

        // Lamun
        setVisible(L.lmFill, dVis.visibleLamun && !!dGeom?.lamun?.polygon);
        setVisible(L.lmLine, dVis.visibleLamun && !!dGeom?.lamun?.polygon);
        setVisible(L.lmPoint, dVis.visibleLamun && !!dGeom?.lamun?.point);
        const lmF = makeCondFilter(condList("lamun"));
        setFilter(L.lmFill, ["all", bothPoly, lmF]);
        setFilter(L.lmLine, ["all", bothPoly, lmF]);
        setFilter(L.lmPoint, ["all", bothPoint, lmF]);

        // Dugong (point only)
        setVisible(L.dgPoint, dVis.visibleDugong && !!dGeom?.dugong?.point);
        const dgF = makeCondFilter(condList("dugong"));
        setFilter(L.dgPoint, ["all", bothPoint, dgF]);
    }, [isLoaded, dVis, dCond, dGeom]);

    return (
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
function fmt(n) {
    const x = Number(n);
    return Number.isFinite(x) ? x.toFixed(5) : String(n);
}
