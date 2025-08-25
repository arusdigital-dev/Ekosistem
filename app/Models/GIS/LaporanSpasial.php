<?php

namespace App\Models\GIS;

use Illuminate\Database\Eloquent\Model;
use Clickbar\Magellan\Data\Geometries\Geometry; // generic

class LaporanSpasial extends Model
{
   protected $connection = 'pgsql';
    protected $table = 'laporan_spasial';
    protected $fillable = ['category_id','status','props','geom','verified_at','verified_by'];
    protected $casts = ['geom' => \Clickbar\Magellan\Data\Geometries\Geometry::class, 'props' => 'array'];
}
