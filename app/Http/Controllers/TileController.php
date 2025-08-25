<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class TileController extends Controller
{
    // HANYA 3 layer peta
    private array $layers = ['mangrove','lamun','dugong'];

    public function mvt(Request $r, string $layer, int $z, int $x, int $y)
    {
        abort_unless(in_array($layer, $this->layers, true), 404);

        $table = $layer; // langsung pakai nama tabel yang sama
        try {
            if ($z < 0 || $z > 20 || $x < 0 || $y < 0) {
                return response('', 204);
            }

            // Selalu pakai koneksi pgsql; count aman
            $count = DB::connection('pgsql')->table($table)->count();
            if ($count === 0) {
                return response('', 204);
            }

            // MVT → encode base64 agar tidak jadi resource
            $sql = "
              WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env),
              q AS (
                SELECT
                  ST_AsMVTGeom(
                    CASE 
                      WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                      WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                      ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
                    END,
                    b.env, 4096, 64, true
                  ) AS geom,
                  COALESCE(t.props, '{}'::jsonb) AS props,
                  t.id
                FROM {$table} t, b
                WHERE t.geom IS NOT NULL
                  AND ST_IsValid(t.geom) = true
                  AND ST_Intersects(
                    CASE 
                      WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                      WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                      ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
                    END, b.env
                  )
              )
              SELECT encode(ST_AsMVT(q, ?, 4096, 'geom'), 'base64') AS tile_b64
              FROM q
              WHERE q.geom IS NOT NULL;
            ";

            $result = DB::connection('pgsql')->selectOne($sql, [$z, $x, $y, $layer]);
            if (!$result || empty($result->tile_b64)) {
                return response('', 204);
            }

            $tileBinary = base64_decode($result->tile_b64, true);
            if ($tileBinary === false) {
                return response('', 204);
            }

            return response($tileBinary, 200)
                ->header('Content-Type', 'application/vnd.mapbox-vector-tile')
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Cache-Control', 'public, max-age=3600');
        } catch (\Throwable $e) {
            Log::error("MVT Tile Error for $layer/$z/$x/$y", ['error'=>$e->getMessage()]);
            return response('', 204);
        }
    }

    public function debug(Request $r, string $layer, int $z, int $x, int $y)
    {
        if (!app()->environment('local')) abort(404);
        abort_unless(in_array($layer, $this->layers, true), 404);

        $table = $layer;
        $sql = "
          WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env)
          SELECT 
            t.id,
            ST_SRID(t.geom) as srid,
            ST_IsValid(t.geom) as is_valid,
            ST_GeometryType(t.geom) as geom_type,
            ST_AsText(ST_Centroid(t.geom)) as centroid,
            t.props
          FROM {$table} t, b
          WHERE t.geom IS NOT NULL
            AND ST_Intersects(
              CASE 
                WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
              END, b.env
            )
          LIMIT 10;
        ";

        $features = DB::connection('pgsql')->select($sql, [$z,$x,$y]);
        return response()->json([
            'layer'=>$layer,
            'tile'=>"$z/$x/$y",
            'count'=>count($features),
            'features'=>$features,
            'bbox'=>$this->getTileBbox($z,$x,$y),
        ]);
    }

    private function getTileBbox(int $z, int $x, int $y): array
    {
        $n = 2 ** $z;
        $west = $x / $n * 360.0 - 180.0;
        $east = ($x + 1) / $n * 360.0 - 180.0;
        $latRadN = atan(sinh(pi() * (1 - 2 * $y / $n)));
        $latRadS = atan(sinh(pi() * (1 - 2 * ($y + 1) / $n)));
        return ['west'=>$west,'south'=>rad2deg($latRadS),'east'=>$east,'north'=>rad2deg($latRadN)];
    }
}