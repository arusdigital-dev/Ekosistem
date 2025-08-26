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
        // Pastikan categories ada
        $cats = collect(['mangrove','lamun','dugong'])
            ->mapWithKeys(fn($n) => [$n => Category::firstOrCreate(['name'=>$n])]);

        // Random geodetic point inside BBOX (EPSG:4326)
        $randPoint = function() {
            [$minx,$miny,$maxx,$maxy] = self::BBOX;
            $lon = $minx + mt_rand()/mt_getrandmax() * ($maxx - $minx);
            $lat = $miny + mt_rand()/mt_getrandmax() * ($maxy - $miny);
            return Point::makeGeodetic($lat, $lon); // SRID 4326
        };

        // Persegi panjang di sekitar titik pusat
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

        // ====== LAMUN: 3 POLYGON + 3 POINT ======
        foreach (range(1,3) as $i) {
            $poly = $rectPoly($randPoint(), 0.04, 0.03);
            Lamun::create([
                'name'  => "Lamun Kawasan $i",
                'props' => ['source'=>'dummy','kondisi'=>rand(0,1)?'hidup':'mati'],
                'geom'  => MultiPolygon::make([$poly]),
            ]);
        }
        foreach (range(1,3) as $i) {
            Lamun::create([
                'name'  => "Lamun Titik $i",
                'props' => ['source'=>'dummy','kondisi'=>rand(0,1)?'hidup':'mati'],
                'geom'  => $randPoint(),
            ]);
        }

        // ====== MANGROVE: 3 POLYGON + 3 POINT ======
        foreach (range(1,3) as $i) {
            $poly = $rectPoly($randPoint());
            Mangrove::create([
                'name'  => "Mangrove Kawasan $i",
                'props' => ['source'=>'dummy','kondisi'=>rand(0,1)?'hidup':'mati'],
                'geom'  => MultiPolygon::make([$poly]),
            ]);
        }
        foreach (range(1,3) as $i) {
            Mangrove::create([
                'name'  => "Mangrove Titik $i",
                'props' => ['source'=>'dummy','kondisi'=>rand(0,1)?'hidup':'mati'],
                'geom'  => $randPoint(),
            ]);
        }

        // ====== DUGONG: 6 POINT ======
        foreach (range(1,6) as $i) {
            Dugong::create([
                'props'       => [
                    'source'=>'dummy',
                    'who'=>'observer '.Str::random(4),
                    'kondisi'=>collect(['hidup','mati','terluka'])->random(),
                ],
                'geom'        => $randPoint(),
                'observed_at' => now()->subDays(rand(0,60)),
            ]);
        }

        // ====== LAPORAN SPASIAL: 10 DATA (5 approved, 3 pending, 2 rejected) ======
        $statuses = array_merge(
            array_fill(0,5,'approved'),
            array_fill(0,3,'pending'),
            array_fill(0,2,'rejected'),
        );

        foreach ($statuses as $status) {
            $cat = collect(['mangrove','lamun','dugong'])->random();
            // Untuk lamun & mangrove boleh polygon/point; dugong umumnya point
            $isPolygon = in_array($cat, ['mangrove','lamun']) ? (bool)rand(0,1) : false;
            $geom = $isPolygon ? $rectPoly($randPoint(), 0.02, 0.015) : $randPoint();

            LaporanSpasial::create([
                'category_id' => $cats[$cat]->id,
                'status'      => $status,
                'props'       => [
                    'nama'      => "pelapor ".Str::random(3),
                    'email'     => Str::random(5).'@mail.com',
                    'telepon'   => '08'.rand(100000000,999999999),
                    'tanggal'   => now()->toDateString(),
                    'waktu'     => now()->format('H:i'),
                    'kondisi'   => $cat==='dugong'
                        ? collect(['hidup','mati','terluka'])->random()
                        : collect(['hidup','mati'])->random(),
                    'lokasi'    => "Lokasi ".Str::random(4),
                    'deskripsi' => "Laporan $cat dummy",
                    'gambar'    => "img_".Str::random(5).".jpg",
                ],
                'geom'        => $geom,
            ]);
        }
    }
}
