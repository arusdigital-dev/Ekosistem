<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::connection('pgsql')->create('categories', function (Blueprint $t) {
            $t->id();
            $t->string('name');                 // 'mangrove' | 'lamun' | 'dugong'
            $t->string('icon')->nullable();
            $t->timestamps();
        });

        Schema::connection('pgsql')->create('laporan_spasial', function (Blueprint $t) {
            $t->id();
            $t->foreignId('category_id')->constrained('categories');
            $t->enum('status', ['pending','approved','rejected'])->default('pending');
            $t->jsonb('props')->nullable();             // nama,email,telepon,deskripsi,gambar,dsb
            $t->geometry('geom', null, 4326);          // generic Geometry (Point/Polygon/MultiPolygon)
            $t->timestampTz('submitted_at')->useCurrent();
            $t->timestampTz('verified_at')->nullable();
            $t->bigInteger('verified_by')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection('pgsql')->dropIfExists('laporan_spasial');
        Schema::connection('pgsql')->dropIfExists('categories');
    }
};
