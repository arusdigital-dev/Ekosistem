<?php

namespace App\Models\GIS;

use Illuminate\Database\Eloquent\Model;
use Clickbar\Magellan\Data\Geometries\MultiPolygon;

class Lamun extends Model
{
     protected $connection = 'pgsql';
    protected $table = 'lamun';
    protected $fillable = ['name','props','geom'];
    protected $casts = ['geom' => \Clickbar\Magellan\Data\Geometries\MultiPolygon::class, 'props' => 'array'];
}
