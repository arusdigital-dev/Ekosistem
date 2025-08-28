<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class TileController extends Controller
{
    private array $layers = ['mangrove','lamun','dugong'];

    public function mvt(Request $r, string $layer, int $z, int $x, int $y)
    {
        abort_unless(in_array($layer, $this->layers, true), 404);

        try {
            if ($z < 0 || $z > 20 || $x < 0 || $y < 0) {
                return response('', 204);
            }

            $catId = DB::connection('pgsql')
                ->table('categories')->where('name',$layer)->value('id');

            $conds      = $this->parseCommaList($r->query('cond'));
            $geomFilter = $this->parseCommaList($r->query('geom'));

            $extraWhere = '';
            $bindings   = [];

            if (!empty($conds)) {
                $in = implode(',', array_fill(0, count($conds), '?'));
                $extraWhere .= " AND lower(coalesce(t.props->>'kondisi','')) IN ($in) ";
                array_push($bindings, ...array_map('strtolower', $conds));
            }

            if (!empty($geomFilter) && count($geomFilter) < 2) {
                if (in_array('point', $geomFilter, true)) {
                    $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Point','ST_MultiPoint') ";
                } elseif (in_array('polygon', $geomFilter, true)) {
                    $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Polygon','ST_MultiPolygon') ";
                }
            }

            $srcSql = "
              (
                SELECT id, props, geom_3857
                FROM {$layer}

                UNION ALL

                SELECT ls.id, ls.props, ls.geom_3857
                FROM laporan_spasial ls
                WHERE ls.status = 'approved' " . ($catId ? " AND ls.category_id = ?" : " AND 1=0") . "
              ) AS t
            ";
            $srcBindings = $catId ? [$catId] : [];

            $sql = "
              WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env),
              q AS (
                SELECT
                  ST_AsMVTGeom(
                    t.geom_3857,
                    b.env, 4096, 64, true
                  ) AS geom,
                  COALESCE(t.props, '{}'::jsonb) AS props,
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

            $repo = Cache::store('redis');
            $ttl  = (int) env('MVT_TILE_TTL_SECONDS', 1800);

            $keyParts = [$layer,$z,$x,$y];
            if (!empty($conds))      { $keyParts[] = 'c='.implode(',', $conds); }
            if (!empty($geomFilter)) { $keyParts[] = 'g='.implode(',', $geomFilter); }
            $cacheKey   = 'mvt:'.implode(':', $keyParts);
            $layerIndex = "mvt:idx:$layer";

            $tileBinary = $repo->remember($cacheKey, $ttl, function () use ($sql,$z,$x,$y,$srcBindings,$bindings,$layer,$cacheKey,$layerIndex) {
                $params = array_merge([$z,$x,$y], $srcBindings, $bindings, [$layer]);
                $result = DB::connection('pgsql')->selectOne($sql, $params);
                if (!$result || empty($result->tile_b64)) return null;

                $bin = base64_decode($result->tile_b64, true);
                if ($bin === false) return null;

                // daftar key ke index Redis per-layer
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

        $catId = DB::connection('pgsql')->table('categories')->where('name',$layer)->value('id');

        $conds      = $this->parseCommaList($r->query('cond'));
        $geomFilter = $this->parseCommaList($r->query('geom'));

        $extraWhere = '';
        $bindings   = [];

        if (!empty($conds)) {
            $in = implode(',', array_fill(0, count($conds), '?'));
            $extraWhere .= " AND lower(coalesce(t.props->>'kondisi','')) IN ($in) ";
            array_push($bindings, ...array_map('strtolower', $conds));
        }
        if (!empty($geomFilter) && count($geomFilter) < 2) {
            if (in_array('point', $geomFilter, true)) {
                $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Point','ST_MultiPoint') ";
            } elseif (in_array('polygon', $geomFilter, true)) {
                $extraWhere .= " AND GeometryType(t.geom_3857) IN ('ST_Polygon','ST_MultiPolygon') ";
            }
        }

        $srcSql = "
          (
            SELECT id, props, geom_3857 FROM {$layer}
            UNION ALL
            SELECT ls.id, ls.props, ls.geom_3857
            FROM laporan_spasial ls
            WHERE ls.status='approved' " . ($catId ? " AND ls.category_id = ?" : " AND 1=0") . "
          ) AS t
        ";
        $srcBindings = $catId ? [$catId] : [];

        $sql = "
          WITH b AS (SELECT ST_TileEnvelope(?, ?, ?) AS env)
          SELECT 
            t.id,
            ST_SRID(t.geom_3857) as srid,
            ST_IsValid(t.geom_3857) as is_valid,
            ST_GeometryType(t.geom_3857) as geom_type,
            ST_AsText(ST_Centroid(t.geom_3857)) as centroid,
            t.props
          FROM $srcSql, b
          WHERE t.geom_3857 IS NOT NULL
            AND ST_Intersects(t.geom_3857, b.env)
            $extraWhere
          LIMIT 10;
        ";

        $features = DB::connection('pgsql')->select($sql, array_merge([$z,$x,$y], $srcBindings, $bindings));

        return response()->json([
            'layer'=>$layer,
            'tile'=>"$z/$x/$y",
            'filters'=>['cond'=>$conds, 'geom'=>$geomFilter],
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
