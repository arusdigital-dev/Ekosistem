<?php

namespace App\Models\GIS;

use Illuminate\Database\Eloquent\Model;
use Clickbar\Magellan\Data\Geometries\MultiPolygon;
use Clickbar\Magellan\Data\Geometries\Geometry;
class Mangrove extends Model
{
    protected $connection = 'pgsql';
    protected $table = 'mangrove';
    protected $fillable = ['name','props','geom'];
    protected $casts = ['geom' => Geometry::class, 'props' => 'array'];
}
