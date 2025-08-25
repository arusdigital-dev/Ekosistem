<?php

namespace App\Models\GIS;

use Illuminate\Database\Eloquent\Model;
use Clickbar\Magellan\Data\Geometries\MultiPolygon;

class Mangrove extends Model
{
    protected $connection = 'pgsql';
    protected $table = 'mangrove';
    protected $fillable = ['name','props','geom'];
    protected $casts = ['geom' => \Clickbar\Magellan\Data\Geometries\MultiPolygon::class, 'props' => 'array'];
}
