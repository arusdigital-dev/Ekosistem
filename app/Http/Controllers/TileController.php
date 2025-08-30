<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class TileController extends Controller
{
    // Tiga layer utama; laporan_spasial: nanti
    private array $layers = ['mangrove','lamun','dugong'];

    public function mvt(Request $r, string $layer, int $z, int $x, int $y)
    {
        abort_unless(in_array($layer, $this->layers, true), 404);

        try {
            if ($z < 0 || $z > 20 || $x < 0 || $y < 0) {
                return response('', 204);
            }

            // ===== filters dari querystring =====
            $conds      = $this->parseCommaList($r->query('cond')); // dugong
            $krits      = $this->parseCommaList($r->query('krit')); // lamun
            $geomFilter = $this->parseCommaList($r->query('geom'));

            $extraWhere = '';
            $bindings   = [];

            // Kondisi (dugong saja) — direct string comparison dengan normalisasi sederhana
            if (!empty($conds) && $layer === 'dugong') {
                $conditionParts = [];
                foreach ($conds as $c) {
                    if ($c === 'hidup') {
                        $conditionParts[] = "lower(coalesce(t.props->>'condition','')) = 'hidup'";
                    } elseif ($c === 'mati') {
                        $conditionParts[] = "lower(coalesce(t.props->>'condition','')) LIKE 'mati%'";
                    } elseif ($c === 'terluka') {
                        $conditionParts[] = "lower(coalesce(t.props->>'condition','')) LIKE '%terluka%'";
                    }
                }
                if ($conditionParts) {
                    $extraWhere .= " AND (".implode(' OR ', $conditionParts).") ";
                }
            }

            // Kriteria (lamun saja) — menggunakan field name langsung, filter hanya kategori lamun
            if (!empty($krits) && $layer === 'lamun') {
                $lamunConditions = [];
                foreach ($krits as $k) {
                    if (in_array($k, ['sangat_padat', 'padat', 'sedang', 'jarang'], true)) {
                        $lamunConditions[] = "lower(coalesce(t.name,'')) = ?";
                        $bindings[] = 'lamun ' . str_replace('_', ' ', $k);
                    }
                }
                if ($lamunConditions) {
                    $extraWhere .= " AND (".implode(' OR ', $lamunConditions).") ";
                }
            }

            // Filter tipe geometri (opsional)
            if (!empty($geomFilter) && count($geomFilter) < 2) {
                if (in_array('point', $geomFilter, true)) {
                    $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Point','ST_MultiPoint') ";
                } elseif (in_array('polygon', $geomFilter, true)) {
                    $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Polygon','ST_MultiPolygon') ";
                }
            }

            // Sumber: langsung tabel layer dengan field name untuk lamun
            $srcSql = ($layer === 'lamun')
                ? " ( SELECT id, name, props, geom_3857 FROM {$layer} ) AS t "
                : " ( SELECT id, props, geom_3857 FROM {$layer} ) AS t ";

            // properti turunan untuk payload MVT
            $kondisiSql = ($layer === 'dugong')
                ? "lower(coalesce(t.props->>'condition','')) AS kondisi"
                : "NULL::text AS kondisi";

            $kriteriaSql = ($layer === 'lamun')
                ? "CASE 
                    WHEN lower(coalesce(t.name,'')) = 'lamun sangat padat' THEN 'sangat_padat'
                    WHEN lower(coalesce(t.name,'')) = 'lamun padat' THEN 'padat'
                    WHEN lower(coalesce(t.name,'')) = 'lamun sedang' THEN 'sedang'
                    WHEN lower(coalesce(t.name,'')) = 'lamun jarang' THEN 'jarang'
                    ELSE NULL
                  END AS kriteria"
                : "NULL::text AS kriteria";

            $sql = "
              WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env),
              q AS (
                SELECT
                  ST_AsMVTGeom(t.geom_3857, b.env, 4096, 64, true) AS geom,
                  COALESCE(t.props, '{}'::jsonb) AS props,
                  $kondisiSql,
                  $kriteriaSql,
                  NULLIF(t.id, 0) AS id
                FROM $srcSql, b
                WHERE t.geom_3857 IS NOT NULL
                  AND ST_IsValid(t.geom_3857) = true
                  AND ST_Intersects(t.geom_3857, b.env)
                  $extraWhere
              )
              SELECT encode(ST_AsMVT(q, ?, 4096, 'geom' ORDER BY NULL), 'base64') AS tile_b64
              FROM q
              WHERE q.geom IS NOT NULL;
            ";

            // caching
            $repo = Cache::store('redis');
            $ttl  = (int) env('MVT_TILE_TTL_SECONDS', 1800);

            $keyParts = [$layer,$z,$x,$y];
            if (!empty($conds))      { $keyParts[] = 'c='.implode(',', $conds); }
            if (!empty($krits))      { $keyParts[] = 'k='.implode(',', $krits); }
            if (!empty($geomFilter)) { $keyParts[] = 'g='.implode(',', $geomFilter); }

            $cacheKey   = 'mvt:'.implode(':', $keyParts);
            $layerIndex = "mvt:idx:$layer";

            $tileBinary = $repo->remember($cacheKey, $ttl, function () use ($sql,$z,$x,$y,$bindings,$layer,$cacheKey,$layerIndex) {
                $params = array_merge([$z,$x,$y], $bindings, [$layer]);
                $result = DB::connection('pgsql')->selectOne($sql, $params);
                if (!$result || empty($result->tile_b64)) return null;

                $bin = base64_decode($result->tile_b64, true);
                if ($bin === false) return null;

                try {
                    Redis::sadd($layerIndex, [$cacheKey]);
                    $ttl = (int) env('MVT_TILE_TTL_SECONDS', 1800);
                    if ($ttl > 0) Redis::expire($layerIndex, max($ttl,1800));
                } catch (\Throwable $e) {
                    Log::warning('MVT index sadd failed', ['error'=>$e->getMessage()]);
                }

                return $bin;
            });

            if (!$tileBinary) {
                return response('', 204);
            }

            return response($tileBinary, 200)
                ->header('Content-Type', 'application/vnd.mapbox-vector-tile')
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Cache-Control', 'public, max-age='.$ttl);
        } catch (\Throwable $e) {
            Log::error("MVT Tile Error for $layer/$z/$x/$y", ['error'=>$e->getMessage()]);
            return response('', 204);
        }
    }

    public function debug(Request $r, string $layer, int $z, int $x, int $y)
    {
        if (!app()->environment('local')) abort(404);
        abort_unless(in_array($layer, $this->layers, true), 404);

        $conds      = $this->parseCommaList($r->query('cond'));
        $krits      = $this->parseCommaList($r->query('krit'));
        $geomFilter = $this->parseCommaList($r->query('geom'));

        $extraWhere = '';
        $bindings   = [];

        if (!empty($conds) && $layer === 'dugong') {
            $conditionParts = [];
            foreach ($conds as $c) {
                if ($c === 'hidup') {
                    $conditionParts[] = "lower(coalesce(t.props->>'condition','')) = 'hidup'";
                } elseif ($c === 'mati') {
                    $conditionParts[] = "lower(coalesce(t.props->>'condition','')) LIKE 'mati%'";
                } elseif ($c === 'terluka') {
                    $conditionParts[] = "lower(coalesce(t.props->>'condition','')) LIKE '%terluka%'";
                }
            }
            if ($conditionParts) {
                $extraWhere .= " AND (".implode(' OR ', $conditionParts).") ";
            }
        }

        if (!empty($krits) && $layer === 'lamun') {
            $lamunConditions = [];
            foreach ($krits as $k) {
                if (in_array($k, ['sangat_padat', 'padat', 'sedang', 'jarang'], true)) {
                    $lamunConditions[] = "lower(coalesce(t.name,'')) = ?";
                    $bindings[] = 'lamun ' . str_replace('_', ' ', $k);
                }
            }
            if ($lamunConditions) {
                $extraWhere .= " AND (".implode(' OR ', $lamunConditions).") ";
            }
        }

        if (!empty($geomFilter) && count($geomFilter) < 2) {
            if (in_array('point', $geomFilter, true)) {
                $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Point','ST_MultiPoint') ";
            } elseif (in_array('polygon', $geomFilter, true)) {
                $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Polygon','ST_MultiPolygon') ";
            }
        }

        $srcSql = ($layer === 'lamun')
            ? " ( SELECT id, name, props, geom_3857 FROM {$layer} ) AS t "
            : " ( SELECT id, props, geom_3857 FROM {$layer} ) AS t ";

        $sql = "
          WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env)
          SELECT 
            t.id,
            ST_SRID(t.geom_3857)                               AS srid,
            ST_IsValid(t.geom_3857)                            AS is_valid,
            ST_GeometryType(t.geom_3857)                       AS geom_type,
            ST_AsText(ST_Centroid(t.geom_3857))                AS centroid_3857,
            ST_AsText(ST_Transform(ST_Centroid(t.geom_3857),4326)) AS centroid_4326,
            lower(coalesce(t.props->>'condition',''))          AS kondisi,  -- dugong
            CASE 
              WHEN lower(coalesce(t.name,'')) = 'lamun sangat padat' THEN 'sangat_padat'
              WHEN lower(coalesce(t.name,'')) = 'lamun padat' THEN 'padat'
              WHEN lower(coalesce(t.name,'')) = 'lamun sedang' THEN 'sedang'
              WHEN lower(coalesce(t.name,'')) = 'lamun jarang' THEN 'jarang'
              ELSE NULL
            END                                                AS kriteria, -- lamun
            t.props
          FROM $srcSql, b
          WHERE t.geom_3857 IS NOT NULL
            AND ST_Intersects(t.geom_3857, b.env)
            $extraWhere
          LIMIT 10;
        ";

        $features = DB::connection('pgsql')->select($sql, array_merge([$z,$x,$y], $bindings));

        return response()->json([
            'layer'=>$layer,
            'tile'=>"$z/$x/$y",
            'filters'=>['cond'=>$conds, 'krit'=>$krits, 'geom'=>$geomFilter],
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
            ->filter()->unique()->values()->all();
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
