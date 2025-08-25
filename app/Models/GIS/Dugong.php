<?php

namespace App\Models\GIS;

use Illuminate\Database\Eloquent\Model;
use Clickbar\Magellan\Data\Geometries\Point;

class Dugong extends Model
{
    protected $connection = 'pgsql';
    protected $table = 'dugong';
    protected $fillable = ['props','geom','observed_at'];
    protected $casts = ['geom' => \Clickbar\Magellan\Data\Geometries\Point::class, 'props' => 'array'];
}
