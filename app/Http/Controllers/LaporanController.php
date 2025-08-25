<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLaporanRequest;
use App\Models\Category;
use App\Models\GIS\{LaporanSpasial, Mangrove, Lamun, Dugong};
use Clickbar\Magellan\Database\PostgisFunctions\ST;
use Clickbar\Magellan\Data\Geometries\{Geometry, Point, Polygon, MultiPolygon, LineString};
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class LaporanController extends Controller
{
   public function index(Request $r)
{
    $q = LaporanSpasial::query()
        ->select('id','category_id','status','props','geom');

    if ($bbox = $r->query('bbox')) {
        // bbox: "minx,miny,maxx,maxy" (lon,lat,lon,lat)
        [$minx,$miny,$maxx,$maxy] = array_map('floatval', explode(',', $bbox, 4));

        // Bangun polygon berupa persegi panjang dari bbox
        $ring = LineString::make([
            Point::makeGeodetic($miny, $minx),
            Point::makeGeodetic($miny, $maxx),
            Point::makeGeodetic($maxy, $maxx),
            Point::makeGeodetic($maxy, $minx),
            Point::makeGeodetic($miny, $minx), // close ring
        ]);
        $bboxPolygon = Polygon::make([$ring]);

        // Pakai polygon bbox sebagai argumen kedua ST::intersects
        $q->where(ST::intersects('geom', $bboxPolygon), true); // boolean where wajib pakai 'true'
    }

    if ($status = $r->query('status')) {
        $q->where('status', $status);
    }

    return $q->limit(5000)->get();
}

    public function store(StoreLaporanRequest $r)
    {
        // Pakai validated/safe agar IDE gak “teriak” soal input()/only()
        $data  = $r->validated();

        $props = Arr::only($data, [
            'nama','email','telepon','tanggal','waktu','kondisi',
            'detail_lokasi','deskripsi_laporan','gambar',
        ]);

        /** @var Geometry $geom */
        $geom = $data['geometry']; // sudah otomatis jadi Geometry via FormRequest trait

        $lap = LaporanSpasial::create([
            'category_id' => (int) $data['category_id'],
            'status'      => 'pending',
            'props'       => $props,
            'geom'        => $geom,
        ]);

        return response()->json(['id' => $lap->id, 'status' => 'ok']);
    }

    public function verify(int $id, Request $r)
    {
        // Simpan hasil validasinya agar IDE tidak menandai ->input()
        $validated = $r->validate(['status' => 'required|in:approved,rejected']);
        $status    = $validated['status'];

        $lap = LaporanSpasial::findOrFail($id);

        $lap->update([
            'status'      => $status,
            'verified_by' => Auth::id() ?? 1, // pakai Facade → IDE happy
            'verified_at' => now(),
        ]);

        if ($lap->status === 'approved') {
            $this->materializeApproved($lap);
        }

        return response()->json(['status' => 'updated']);
    }

    /**
     * Pindahkan geometry dari LaporanSpasial approved ke tabel final sesuai kategori.
     * Menghindari method_exists(... 'toMultiPolygon') → gunakan instanceof yang aman.
     */
    protected function materializeApproved(LaporanSpasial $lap): void
    {
        $cat = Category::find($lap->category_id);
        if (!$cat) {
            return;
        }

        $name = strtolower($cat->name);

        switch ($name) {
            case 'mangrove':
                // terima Polygon atau MultiPolygon; konversi jadi MultiPolygon yang valid
                $multi = $this->asMultiPolygon($lap->geom);
                if ($multi) {
                    Mangrove::create([
                        'name'  => 'Laporan '.$lap->id,
                        'props' => $lap->props,
                        'geom'  => $multi,
                    ]);
                }
                break;

            case 'lamun':
                $multi = $this->asMultiPolygon($lap->geom);
                if ($multi) {
                    Lamun::create([
                        'name'  => 'Laporan '.$lap->id,
                        'props' => $lap->props,
                        'geom'  => $multi,
                    ]);
                }
                break;

            case 'dugong':
                // butuh Point
                if ($lap->geom instanceof Point) {
                    Dugong::create([
                        'props'       => $lap->props,
                        'geom'        => $lap->geom,
                        'observed_at' => now(),
                    ]);
                }
                break;
        }
    }

    /**
     * Ubah Geometry jadi MultiPolygon jika memungkinkan.
     * - Kalau sudah MultiPolygon → return apa adanya
     * - Kalau Polygon → bungkus ke MultiPolygon::make([$polygon])
     * - Lainnya → null
     */
    protected function asMultiPolygon(?Geometry $g): ?MultiPolygon
    {
        if ($g instanceof MultiPolygon) {
            return $g;
        }
        if ($g instanceof Polygon) {
            return MultiPolygon::make([$g]);
        }
        return null;
    }
}
