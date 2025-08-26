<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TileController extends Controller
{
    // HANYA 3 layer peta
    private array $layers = ['mangrove','lamun','dugong'];

    public function mvt(Request $r, string $layer, int $z, int $x, int $y)
    {
        abort_unless(in_array($layer, $this->layers, true), 404);

        try {
            if ($z < 0 || $z > 20 || $x < 0 || $y < 0) {
                return response('', 204);
            }

            // Ambil category_id untuk laporan_spasial union
            $catId = DB::connection('pgsql')->table('categories')->where('name',$layer)->value('id');

            // Filter dari query string
            $conds = $this->parseCommaList($r->query('cond'));   // ['hidup','mati']
            $geomFilter = $this->parseCommaList($r->query('geom')); // ['point','polygon']

            // Bangun WHERE tambahan (JSON props->kondisi + geometry type)
            $extraWhere = '';
            $bindings = [];

            if (!empty($conds)) {
                // COALESCE(props,'{}')->>'kondisi' IN (...)
                $in = implode(',', array_fill(0, count($conds), '?'));
                $extraWhere .= " AND COALESCE(t.props,'{}'::jsonb)->>'kondisi' IN ($in) ";
                array_push($bindings, ...$conds);
            }

            if (!empty($geomFilter) && count($geomFilter) < 2) {
                // Jika hanya 1 jenis diminta
                if (in_array('point', $geomFilter, true)) {
                    $extraWhere .= " AND (GeometryType(t.geom) ILIKE '%Point') ";
                } elseif (in_array('polygon', $geomFilter, true)) {
                    $extraWhere .= " AND (GeometryType(t.geom) ILIKE '%Polygon') ";
                }
            }
            // default: tidak dibatasi (point+polygon)

            // Subquery sumber data: union tabel utama + laporan_spasial(approved)
            // Penting: alias field konsisten (id, props, geom)
            $srcSql = "
              (
                SELECT id, props, geom
                FROM {$layer}

                UNION ALL

                SELECT ls.id, ls.props, ls.geom
                FROM laporan_spasial ls
                WHERE ls.status = 'approved' " . ($catId ? " AND ls.category_id = ?" : " AND 1=0") . "
              ) AS t
            ";
            $srcBindings = $catId ? [$catId] : [];

            // Cek ada data terpotong di tile (exist check pada union + filter)
            $existSql = "
              WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env)
              SELECT 1
              FROM $srcSql, b
              WHERE t.geom IS NOT NULL
                AND ST_IsValid(t.geom) = true
                AND ST_Intersects(
                  CASE 
                    WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                    WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                    ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
                  END, b.env
                )
                $extraWhere
              LIMIT 1
            ";
            $exists = DB::connection('pgsql')->select($existSql, array_merge([$z,$x,$y], $srcBindings, $bindings));
            if (empty($exists)) {
                return response('', 204);
            }

            // Query utama MVT → encode base64
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
                  NULLIF(t.id, 0) AS id
                FROM $srcSql, b
                WHERE t.geom IS NOT NULL
                  AND ST_IsValid(t.geom) = true
                  AND ST_Intersects(
                    CASE 
                      WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                      WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                      ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
                    END, b.env
                  )
                  $extraWhere
              )
              SELECT encode(ST_AsMVT(q, ?, 4096, 'geom'), 'base64') AS tile_b64
              FROM q
              WHERE q.geom IS NOT NULL;
            ";

            $params = array_merge([$z,$x,$y], $srcBindings, $bindings, [$layer]);
            $result = DB::connection('pgsql')->selectOne($sql, $params);
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

        $catId = DB::connection('pgsql')->table('categories')->where('name',$layer)->value('id');

        $conds = $this->parseCommaList($r->query('cond'));
        $geomFilter = $this->parseCommaList($r->query('geom'));

        $extraWhere = '';
        $bindings = [];

        if (!empty($conds)) {
            $in = implode(',', array_fill(0, count($conds), '?'));
            $extraWhere .= " AND COALESCE(t.props,'{}'::jsonb)->>'kondisi' IN ($in) ";
            array_push($bindings, ...$conds);
        }
        if (!empty($geomFilter) && count($geomFilter) < 2) {
            if (in_array('point', $geomFilter, true)) {
                $extraWhere .= " AND (GeometryType(t.geom) ILIKE '%Point') ";
            } elseif (in_array('polygon', $geomFilter, true)) {
                $extraWhere .= " AND (GeometryType(t.geom) ILIKE '%Polygon') ";
            }
        }

        $srcSql = "
          (
            SELECT id, props, geom FROM {$layer}
            UNION ALL
            SELECT ls.id, ls.props, ls.geom
            FROM laporan_spasial ls
            WHERE ls.status='approved' " . ($catId ? " AND ls.category_id = ?" : " AND 1=0") . "
          ) AS t
        ";
        $srcBindings = $catId ? [$catId] : [];

        $sql = "
          WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env)
          SELECT 
            t.id,
            ST_SRID(t.geom) as srid,
            ST_IsValid(t.geom) as is_valid,
            ST_GeometryType(t.geom) as geom_type,
            ST_AsText(ST_Centroid(t.geom)) as centroid,
            t.props
          FROM $srcSql, b
          WHERE t.geom IS NOT NULL
            AND ST_Intersects(
              CASE 
                WHEN ST_SRID(t.geom) = 4326 THEN ST_Transform(t.geom, 3857)
                WHEN ST_SRID(t.geom) = 3857 THEN t.geom
                ELSE ST_Transform(ST_SetSRID(t.geom, 4326), 3857)
              END, b.env
            )
            $extraWhere
          LIMIT 10;
        ";

        $features = DB::connection('pgsql')->select($sql, array_merge([$z,$x,$y], $srcBindings, $bindings));

        return response()->json([
            'layer'=>$layer,
            'tile'=>"$z/$x/$y",
            'filters'=>[
                'cond'=>$conds,
                'geom'=>$geomFilter,
            ],
            'count'=>count($features),
            'features'=>$features,
            'bbox'=>$this->getTileBbox($z,$x,$y),
        ]);
    }

    private function parseCommaList($value): array
    {
        if (!$value) return [];
        return collect(explode(',', (string)$value))
            ->map(fn($s)=>trim(strtolower($s)))
            ->filter()
            ->unique()
            ->values()
            ->all();
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
