<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
