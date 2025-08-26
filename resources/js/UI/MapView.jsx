import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Perubahan:
 * - Sumber dipisah per tipe: {jenis}_{poly|point} agar style berbeda.
 * - Dugong hanya point (tidak ada polygon).
 * - Warna & simbol dibedakan untuk point vs polygon per jenis.
 * - Loading indicator: kirim status ke parent via onLoadingChange.
 */
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

    // helper: build query string dari cond & geom
    const buildQuery = (layer, want) => {
        // want: 'point' | 'polygon'
        const c = cond?.[layer] || {};
        const condList = Object.keys(c).filter((k) => c[k]);

        const params = new URLSearchParams();
        // kirim cond hanya jika tidak semua tercentang (biar hemat cache)
        if (condList.length && condList.length < Object.keys(c).length) {
            params.set("cond", condList.join(","));
        }
        // kirim geom sesuai sumber
        params.set("geom", want); // paksa sesuai sumber
        const qs = params.toString();
        return qs ? `?${qs}` : "";
    };

    // ID sources & layers
    const SRC = {
        base: "osm",
        // mangrove
        mangrovePoly: "mangrove-poly",
        mangrovePoint: "mangrove-point",
        // lamun
        lamunPoly: "lamun-poly",
        lamunPoint: "lamun-point",
        // dugong
        dugongPoint: "dugong-point-src",
    };

    const LAYER = {
        // mangrove poly
        mangroveFill: "mangrove-fill",
        mangroveLine: "mangrove-line",
        // mangrove point
        mangrovePoint: "mangrove-point",
        // lamun poly
        lamunFill: "lamun-fill",
        lamunLine: "lamun-line",
        // lamun point
        lamunPoint: "lamun-point",
        // dugong point
        dugongPoint: "dugong-point",
    };

    const setVisibility = (id, visible) => {
        const map = mapRef.current;
        if (!map || !map.getLayer(id)) return;
        map.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
    };

    // util: pasang listener loading sederhana
    const attachLoadingListeners = (map) => {
        let pending = 0;
        const setLoading = (val) => onLoadingChange(!!val);

        const onDataLoading = () => {
            pending++;
            setLoading(true);
        };
        const onData = () => {
            pending = Math.max(0, pending - 1);
            if (pending === 0) setLoading(false);
        };
        const onIdle = () => {
            pending = 0;
            setLoading(false);
        };

        map.on("dataloading", onDataLoading);
        map.on("data", onData);
        map.on("idle", onIdle);

        return () => {
            map.off("dataloading", onDataLoading);
            map.off("data", onData);
            map.off("idle", onIdle);
        };
    };

    useEffect(() => {
        if (mapRef.current) return;

        const qsMangrovePoly = buildQuery("mangrove", "polygon");
        const qsMangrovePoint = buildQuery("mangrove", "point");
        const qsLamunPoly = buildQuery("lamun", "polygon");
        const qsLamunPoint = buildQuery("lamun", "point");
        const qsDugongPoint = buildQuery("dugong", "point"); // dugong point-only

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            center: [104.6, 1.1], // Bintan
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

                    // ===== Sumber per tipe (agar style bisa beda) =====
                    // Mangrove POLYGON
                    [SRC.mangrovePoly]: {
                        type: "vector",
                        tiles: [
                            `http://127.0.0.1:8000/tiles/mangrove/{z}/{x}/{y}.mvt${qsMangrovePoly}`,
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    // Mangrove POINT
                    [SRC.mangrovePoint]: {
                        type: "vector",
                        tiles: [
                            `http://127.0.0.1:8000/tiles/mangrove/{z}/{x}/{y}.mvt${qsMangrovePoint}`,
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },

                    // Lamun POLYGON
                    [SRC.lamunPoly]: {
                        type: "vector",
                        tiles: [
                            `http://127.0.0.1:8000/tiles/lamun/{z}/{x}/{y}.mvt${qsLamunPoly}`,
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                    // Lamun POINT
                    [SRC.lamunPoint]: {
                        type: "vector",
                        tiles: [
                            `http://127.0.0.1:8000/tiles/lamun/{z}/{x}/{y}.mvt${qsLamunPoint}`,
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },

                    // Dugong POINT
                    [SRC.dugongPoint]: {
                        type: "vector",
                        tiles: [
                            `http://127.0.0.1:8000/tiles/dugong/{z}/{x}/{y}.mvt${qsDugongPoint}`,
                        ],
                        minzoom: 0,
                        maxzoom: 20,
                    },
                },

                layers: [
                    { id: "osm-raster", type: "raster", source: SRC.base },

                    // ========== Mangrove POLYGON ==========
                    {
                        id: LAYER.mangroveFill,
                        type: "fill",
                        source: SRC.mangrovePoly,
                        "source-layer": "mangrove",
                        paint: {
                            "fill-color": "#27ae60", // hijau kawasan
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: LAYER.mangroveLine,
                        type: "line",
                        source: SRC.mangrovePoly,
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
                    // Mangrove POINT
                    {
                        id: LAYER.mangrovePoint,
                        type: "circle",
                        source: SRC.mangrovePoint,
                        "source-layer": "mangrove",
                        paint: {
                            "circle-color": "#2ecc71", // hijau terang titik
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

                    // ========== Lamun POLYGON ==========
                    {
                        id: LAYER.lamunFill,
                        type: "fill",
                        source: SRC.lamunPoly,
                        "source-layer": "lamun",
                        paint: {
                            "fill-color": "#2980b9", // biru kawasan
                            "fill-opacity": 0.35,
                        },
                    },
                    {
                        id: LAYER.lamunLine,
                        type: "line",
                        source: SRC.lamunPoly,
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
                    // Lamun POINT
                    {
                        id: LAYER.lamunPoint,
                        type: "circle",
                        source: SRC.lamunPoint,
                        "source-layer": "lamun",
                        paint: {
                            "circle-color": "#3498db", // biru terang titik
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

                    // ========== Dugong POINT ==========
                    {
                        id: LAYER.dugongPoint,
                        type: "circle",
                        source: SRC.dugongPoint,
                        "source-layer": "dugong",
                        paint: {
                            "circle-color": "#f1c40f", // kuning titik
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

        const detachLoading = attachLoadingListeners(map);

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

            // set visibility awal sesuai props + pilihan tipe
            setVisibility(
                LAYER.mangroveFill,
                visibleMangrove && !!geom?.mangrove?.polygon
            );
            setVisibility(
                LAYER.mangroveLine,
                visibleMangrove && !!geom?.mangrove?.polygon
            );
            setVisibility(
                LAYER.mangrovePoint,
                visibleMangrove && !!geom?.mangrove?.point
            );

            setVisibility(
                LAYER.lamunFill,
                visibleLamun && !!geom?.lamun?.polygon
            );
            setVisibility(
                LAYER.lamunLine,
                visibleLamun && !!geom?.lamun?.polygon
            );
            setVisibility(
                LAYER.lamunPoint,
                visibleLamun && !!geom?.lamun?.point
            );

            setVisibility(
                LAYER.dugongPoint,
                visibleDugong && !!geom?.dugong?.point
            );
        });

        // klik & hover
        map.on("click", LAYER.mangroveFill, showPopup("Mangrove (Kawasan)"));
        map.on("click", LAYER.mangrovePoint, showPopup("Mangrove (Titik)"));
        map.on("click", LAYER.lamunFill, showPopup("Lamun (Kawasan)"));
        map.on("click", LAYER.lamunPoint, showPopup("Lamun (Titik)"));
        map.on("click", LAYER.dugongPoint, showPopup("Dugong (Titik)"));

        [
            LAYER.mangroveFill,
            LAYER.mangrovePoint,
            LAYER.lamunFill,
            LAYER.lamunPoint,
            LAYER.dugongPoint,
        ].forEach((id) => {
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
            detachLoading?.();
            map.remove();
            mapRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // sync visibility bila props berubah (tanpa rebuild style)
    useEffect(() => {
        if (!isLoaded) return;
        setVisibility(
            LAYER.mangroveFill,
            visibleMangrove && !!geom?.mangrove?.polygon
        );
        setVisibility(
            LAYER.mangroveLine,
            visibleMangrove && !!geom?.mangrove?.polygon
        );
        setVisibility(
            LAYER.mangrovePoint,
            visibleMangrove && !!geom?.mangrove?.point
        );
    }, [
        visibleMangrove,
        geom?.mangrove?.polygon,
        geom?.mangrove?.point,
        isLoaded,
    ]);

    useEffect(() => {
        if (!isLoaded) return;
        setVisibility(LAYER.lamunFill, visibleLamun && !!geom?.lamun?.polygon);
        setVisibility(LAYER.lamunLine, visibleLamun && !!geom?.lamun?.polygon);
        setVisibility(LAYER.lamunPoint, visibleLamun && !!geom?.lamun?.point);
    }, [visibleLamun, geom?.lamun?.polygon, geom?.lamun?.point, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        // dugong point-only
        setVisibility(
            LAYER.dugongPoint,
            visibleDugong && !!geom?.dugong?.point
        );
    }, [visibleDugong, geom?.dugong?.point, isLoaded]);

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

function fmtCoord(num) {
    const n = Number(num);
    if (!Number.isFinite(n)) return String(num);
    return n.toFixed(5);
}
