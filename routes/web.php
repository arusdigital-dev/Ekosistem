<?php

use App\Http\Controllers\{LaporanController, TileController};
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Inertia
Route::get('/', fn () => Inertia::render('Home'));
Route::get('/peta', fn () => Inertia::render('Peta'));
Route::get('/laporan', function () {
    // kirim opsi kategori ke halaman
    return Inertia::render('Laporan', [
        'categories' => Category::select('id','name')->orderBy('name')->get(),
    ]);
});

// API
Route::get('/api/laporan', [LaporanController::class, 'index']); // ← pindah dari /laporan
Route::post('/laporan', [LaporanController::class, 'store']);
Route::post('/laporan/{id}/verify', [LaporanController::class, 'verify']);

Route::get('/tiles/{layer}/{z}/{x}/{y}.mvt', [TileController::class, 'mvt']);
Route::get('/tiles-debug/{layer}/{z}/{x}/{y}', [TileController::class, 'debug'])->name('tiles.debug');
