<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/Ekosistem-Mangrove', function () {
    return Inertia::render('Mangrove');
});

Route::get('/Ekosistem-Lamun', function () {
    return Inertia::render('Lamun');
});

Route::get('/Berita', function () {
    return Inertia::render('Berita');
});

Route::get('/berita/{id}', function ($id) {
    return Inertia::render('BeritaDetail', [
        'beritaId' => $id
    ]);
});

Route::get('/Kegiatan-Penelitian', function () {
    return Inertia::render('KegiatanPenelitian');
});

Route::get('/Artikel', function () {
    return Inertia::render('Artikel');
});

Route::get('/Peneliti', function () {
    return Inertia::render('Peneliti');
});

Route::get('/Kontak', function () {
    return Inertia::render('Kontak');
});
