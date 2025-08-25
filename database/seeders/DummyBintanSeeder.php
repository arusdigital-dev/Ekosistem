<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\GIS\{Mangrove, Lamun, Dugong, LaporanSpasial};
use Clickbar\Magellan\Data\Geometries\{
    Point,
    LineString,
    Polygon,
    MultiPolygon
};
use Illuminate\Support\Str;

class DummyBintanSeeder extends Seeder
{
    // BBOX: [minLon, minLat, maxLon, maxLat]
    const BBOX = [104.30, 0.90, 104.80, 1.30]; // lon/lat approx Bintan

    public function run(): void
    {
        $cats = collect(['mangrove','lamun','dugong'])
            ->mapWithKeys(fn($n) => [$n => Category::firstOrCreate(['name'=>$n])]);

        // Random geodetic point inside BBOX
        $randPoint = function() {
            [$minx,$miny,$maxx,$maxy] = self::BBOX;
            $lon = $minx + mt_rand()/mt_getrandmax() * ($maxx - $minx);
            $lat = $miny + mt_rand()/mt_getrandmax() * ($maxy - $miny);
            return Point::makeGeodetic($lat, $lon); // SRID default 4326 (sesuai config)
        };

        // Persegi panjang di sekitar titik pusat (pakai LineString + Point geodetik)
        $rectPoly = function(Point $c, float $dx=0.05, float $dy=0.035): Polygon {
            $lon = $c->getLongitude();
            $lat = $c->getLatitude();

            $ring = LineString::make([
                Point::makeGeodetic($lat - $dy, $lon - $dx),
                Point::makeGeodetic($lat - $dy, $lon + $dx),
                Point::makeGeodetic($lat + $dy, $lon + $dx),
                Point::makeGeodetic($lat + $dy, $lon - $dx),
                Point::makeGeodetic($lat - $dy, $lon - $dx), // close ring
            ]);

            return Polygon::make([$ring]);
        };

        // Kawasan Mangrove (MultiPolygon dari satu Polygon)
        foreach (range(1,3) as $i) {
            $poly = $rectPoly($randPoint());
            Mangrove::create([
                'name'  => "Kawasan Mangrove $i",
                'props' => ['source'=>'dummy'],
                'geom'  => MultiPolygon::make([$poly]), // <-- oper objek Polygon, bukan getCoordinates()
            ]);
        }

        // Kawasan Lamun
        foreach (range(1,3) as $i) {
            $poly = $rectPoly($randPoint(), 0.04, 0.03);
            Lamun::create([
                'name'  => "Kawasan Lamun $i",
                'props' => ['source'=>'dummy'],
                'geom'  => MultiPolygon::make([$poly]),
            ]);
        }

        // Titik observasi Dugong acak
        foreach (range(1,80) as $i) {
            Dugong::create([
                'props'       => ['source'=>'dummy','who'=>'observer '.Str::random(4)],
                'geom'        => $randPoint(),
                'observed_at' => now()->subDays(rand(0,365)),
            ]);
        }

        // Laporan spasial pending (dugong → point)
        foreach (range(1,10) as $i) {
            LaporanSpasial::create([
                'category_id' => $cats['dugong']->id,
                'status'      => 'pending',
                'props'       => ['nama'=>'pelapor '.Str::random(3), 'deskripsi'=>'dugong terlihat'],
                'geom'        => $randPoint(),
            ]);
        }

        // Laporan spasial pending (mangrove/lamun → polygon)
        foreach (range(1,10) as $i) {
            $cat = rand(0,1) ? 'mangrove' : 'lamun';
            $poly = $rectPoly($randPoint(), 0.02, 0.015);
            LaporanSpasial::create([
                'category_id' => $cats[$cat]->id,
                'status'      => 'pending',
                'props'       => ['nama'=>'pelapor '.Str::random(3), "deskripsi"=>"laporan $cat"],
                'geom'        => $poly, // model cast: Geometry/Polygon sesuai migrasi
            ]);
        }

        // Laporan approved
        foreach (range(1,10) as $i) {
            LaporanSpasial::create([
                'category_id' => $cats['dugong']->id,
                'status'      => 'approved',
                'props'       => ['nama'=>'approved '.Str::random(3)],
                'geom'        => $randPoint(),
            ]);
        }
    }
}
