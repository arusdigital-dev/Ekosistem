import React, { useMemo, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import BintanMap from "@/Components/BintanMap";

export default function Laporan() {
    const { categories = [] } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: categories[0]?.id ?? "",
        geometry: null,
        nama: "",
        email: "",
        telepon: "",
        tanggal: "",
        waktu: "",
        kondisi: "",
        detail_lokasi: "",
        deskripsi_laporan: "",
        gambar: null, // File
    });

    const [gambarPreview, setGambarPreview] = useState(null);
    const [gambarError, setGambarError] = useState("");

    const selectedCategory = useMemo(
        () => categories.find((c) => String(c.id) === String(data.category_id)),
        [categories, data.category_id]
    );

    const kondisiOptions = useMemo(() => {
        const name = (selectedCategory?.name || "").toLowerCase();
        return name === "dugong"
            ? ["hidup", "mati", "terluka"]
            : ["hidup", "mati"];
    }, [selectedCategory]);

    const geometryPretty = data.geometry
        ? JSON.stringify(data.geometry, null, 2)
        : "";

    const canSubmit = !!data.category_id && !!data.geometry && !processing;

    const onSubmit = (e) => {
        e.preventDefault();
        setGambarError("");

        post("/laporan", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (gambarPreview) URL.revokeObjectURL(gambarPreview);
                setGambarPreview(null);
                reset();
                setData("category_id", categories[0]?.id ?? "");
                alert("Laporan berhasil dikirim! Status awal: pending.");
            },
        });
    };

    const handleFileChange = (e) => {
        setGambarError("");
        const file = e.target.files?.[0];
        if (!file) {
            setData("gambar", null);
            if (gambarPreview) URL.revokeObjectURL(gambarPreview);
            setGambarPreview(null);
            return;
        }
        const isImage = file.type.startsWith("image/");
        const maxSizeMB = 5;
        if (!isImage) {
            setGambarError("File harus berupa gambar (image/*).");
            e.target.value = "";
            return;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            setGambarError(`Ukuran file maksimal ${maxSizeMB}MB.`);
            e.target.value = "";
            return;
        }
        setData("gambar", file);
        if (gambarPreview) URL.revokeObjectURL(gambarPreview);
        setGambarPreview(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="py-10"></div>

                {/* grid 1 kolom (mobile & md), 5 kolom saat lg */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* ==== FORM — tampil lebih dulu di mobile & md ==== */}
                    <div className="order-1 lg:order-2 lg:col-span-2">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="rounded-2xl shadow-sm border bg-white p-4 md:p-5">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Kategori{" "}
                                                <span className="text-rose-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                className="mt-1 w-full rounded-xl border px-3 py-2"
                                                value={data.category_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "category_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {categories.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && (
                                                <p className="text-rose-600 text-xs mt-1">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Kondisi
                                            </label>
                                            <select
                                                className="mt-1 w-full rounded-xl border px-3 py-2"
                                                value={data.kondisi}
                                                onChange={(e) =>
                                                    setData(
                                                        "kondisi",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    — Pilih —
                                                </option>
                                                {kondisiOptions.map((k) => (
                                                    <option key={k} value={k}>
                                                        {k}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.kondisi && (
                                                <p className="text-rose-600 text-xs mt-1">
                                                    {errors.kondisi}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Nama Pelapor
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 w-full rounded-xl border px-3 py-2"
                                                value={data.nama}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nama"
                                            />
                                            {errors.nama && (
                                                <p className="text-rose-600 text-xs mt-1">
                                                    {errors.nama}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="mt-1 w-full rounded-xl border px-3 py-2"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="nama@mail.com"
                                            />
                                            {errors.email && (
                                                <p className="text-rose-600 text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700">
                                                Telepon
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 w-full rounded-xl border px-3 py-2"
                                                value={data.telepon}
                                                onChange={(e) =>
                                                    setData(
                                                        "telepon",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            {errors.telepon && (
                                                <p className="text-rose-600 text-xs mt-1">
                                                    {errors.telepon}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Tanggal
                                                </label>
                                                <input
                                                    type="date"
                                                    className="mt-1 w-full rounded-xl border px-3 py-2"
                                                    value={data.tanggal ?? ""}
                                                    onChange={(e) =>
                                                        setData(
                                                            "tanggal",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.tanggal && (
                                                    <p className="text-rose-600 text-xs mt-1">
                                                        {errors.tanggal}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">
                                                    Waktu
                                                </label>
                                                <input
                                                    type="time"
                                                    className="mt-1 w-full rounded-xl border px-3 py-2"
                                                    value={data.waktu ?? ""}
                                                    onChange={(e) =>
                                                        setData(
                                                            "waktu",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.waktu && (
                                                    <p className="text-rose-600 text-xs mt-1">
                                                        {errors.waktu}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">
                                            Detail Lokasi
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full rounded-xl border px-3 py-2"
                                            value={data.detail_lokasi}
                                            onChange={(e) =>
                                                setData(
                                                    "detail_lokasi",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Contoh: Desa X, Kab. Bintan"
                                        />
                                        {errors.detail_lokasi && (
                                            <p className="text-rose-600 text-xs mt-1">
                                                {errors.detail_lokasi}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">
                                            Deskripsi Laporan
                                        </label>
                                        <textarea
                                            className="mt-1 w-full rounded-xl border px-3 py-2"
                                            rows={4}
                                            value={data.deskripsi_laporan}
                                            onChange={(e) =>
                                                setData(
                                                    "deskripsi_laporan",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Jelaskan kondisi/temuan di lapangan…"
                                        />
                                        {errors.deskripsi_laporan && (
                                            <p className="text-rose-600 text-xs mt-1">
                                                {errors.deskripsi_laporan}
                                            </p>
                                        )}
                                    </div>

                                    {/* Upload Gambar */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">
                                            Upload Gambar
                                        </label>
                                        <div className="mt-1 flex items-center gap-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-50"
                                            />
                                        </div>
                                        {gambarError && (
                                            <p className="text-rose-600 text-xs mt-2">
                                                {gambarError}
                                            </p>
                                        )}
                                        {errors.gambar && (
                                            <p className="text-rose-600 text-xs mt-2">
                                                {errors.gambar}
                                            </p>
                                        )}
                                        {gambarPreview && (
                                            <div className="mt-3">
                                                <div className="text-xs text-slate-500 mb-1">
                                                    Preview
                                                </div>
                                                <img
                                                    src={gambarPreview}
                                                    alt="Preview gambar laporan"
                                                    className="max-h-48 rounded-xl border shadow-sm"
                                                />
                                            </div>
                                        )}
                                        <p className="text-xs text-slate-500 mt-2">
                                            Format: JPG/PNG/JPEG • Maks: 5MB
                                        </p>
                                    </div>
                                    {/* /Upload Gambar */}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm ${
                                        canSubmit
                                            ? "bg-slate-900 text-white hover:bg-slate-800"
                                            : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                    }`}
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Kirim Laporan"}
                                </button>
                            </div>

                            {errors.geometry && (
                                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700 text-sm">
                                    {errors.geometry}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* ==== MAP — tampil belakangan di mobile & md, pertama di lg ==== */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                        <BintanMap
                            onGeometryChange={(g) => setData("geometry", g)}
                        />
                        <div className="px-4 py-3 border rounded-2xl bg-white mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Ringkasan Geometry
                                </label>
                                <div className="text-sm text-slate-700">
                                    {data.geometry ? data.geometry.type : "—"}{" "}
                                    {data.geometry?.type === "Point" &&
                                        Array.isArray(
                                            data.geometry.coordinates
                                        ) && (
                                            <span className="text-slate-500">
                                                (
                                                {data.geometry.coordinates[1]?.toFixed(
                                                    5
                                                )}
                                                ,{" "}
                                                {data.geometry.coordinates[0]?.toFixed(
                                                    5
                                                )}
                                                )
                                            </span>
                                        )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    GeoJSON (read-only)
                                </label>
                                <textarea
                                    className="w-full rounded-xl border bg-slate-50/60 text-xs p-2 font-mono text-slate-700"
                                    rows={4}
                                    readOnly
                                    value={geometryPretty}
                                    placeholder='{"type":"Polygon","coordinates":[...]}'
                                />
                            </div>
                        </div>
                    </div>
                    {/* ==== /MAP ==== */}
                </div>
            </div>
        </div>
    );
}
