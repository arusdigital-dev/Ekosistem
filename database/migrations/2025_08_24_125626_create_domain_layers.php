<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::connection('pgsql')->create('mangrove', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->jsonb('props')->nullable();
            $table->geometry('geom', null, 4326);            $table->timestamps();
        });

        Schema::connection('pgsql')->create('lamun', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->jsonb('props')->nullable();
            $table->geometry('geom', null, 4326);
            $table->timestamps();
        });

        Schema::connection('pgsql')->create('dugong', function (Blueprint $table) {
            $table->id();
            $table->jsonb('props')->nullable();
            $table->geometry('geom', 'POINT', 4326);
            $table->timestampTz('observed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection('pgsql')->dropIfExists('dugong');
        Schema::connection('pgsql')->dropIfExists('lamun');
        Schema::connection('pgsql')->dropIfExists('mangrove');
    }
};
