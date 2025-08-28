<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class TileCacheCommand extends Command
{
    protected $signature = 'mvt-cache {action : clear|warm}
                            {--layer= : mangrove|lamun|dugong|all}
                            {--z=9 : zoom}
                            {--minx=403} {--miny=253} {--maxx=406} {--maxy=255}';

    protected $description = 'Clear or warm MVT tile cache (Redis).';

    public function handle()
    {
        $action = $this->argument('action');
        $layer  = $this->option('layer') ?: 'all';

        if ($action === 'clear') return $this->clear($layer);
        if ($action === 'warm')  return $this->warm($layer);

        $this->error('Unknown action. Use clear|warm.');
        return self::FAILURE;
    }

    protected function clear(string $layer)
    {
        $deleted = 0;

        if ($layer === 'all') {
            $deleted += $this->deleteByScan('mvt:*');
            $deleted += $this->deleteByScan('mvt:idx:*');
            $this->info("Cleared all MVT caches. Deleted keys: {$deleted}");
            return self::SUCCESS;
        }

        $indexKey = "mvt:idx:$layer";
        try {
            $members = Redis::smembers($indexKey);
            if (!empty($members)) {
                $chunks = array_chunk($members, 500);
                foreach ($chunks as $chunk) {
                    foreach ($chunk as $fullKey) {
                        Cache::store('redis')->forget($fullKey);
                    }
                    $deleted += count($chunk);
                }
            }
            Redis::del($indexKey);
        } catch (\Throwable $e) {
            $this->warn("Index set deletion fallback via SCAN: ".$e->getMessage());
            $deleted += $this->deleteByScan("mvt:{$layer}:*");
            Redis::del($indexKey);
        }

        $this->info("Cleared layer [$layer]. Deleted keys: {$deleted}");
        return self::SUCCESS;
    }

    private function deleteByScan(string $pattern): int
    {
        $deleted = 0;
        $cursor = 0;
        do {
            [$cursor, $keys] = Redis::scan($cursor, 'MATCH', $pattern, 'COUNT', 1000);
            if (!empty($keys)) {
                Redis::pipeline(function ($pipe) use ($keys, &$deleted) {
                    foreach ($keys as $k) {
                        $pipe->del($k);
                        $deleted++;
                    }
                });
            }
        } while ($cursor != 0);

        return $deleted;
    }

    protected function warm(string $layer)
    {
        $z = (int) $this->option('z');
        $minx = (int) $this->option('minx');
        $miny = (int) $this->option('miny');
        $maxx = (int) $this->option('maxx');
        $maxy = (int) $this->option('maxy');

        $layers = $layer === 'all' ? ['mangrove','lamun','dugong'] : [$layer];
        $base = rtrim(config('app.url') ?? 'http://127.0.0.1:8000', '/');

        $count = 0;
        foreach ($layers as $ly) {
            for ($x=$minx; $x<=$maxx; $x++) {
                for ($y=$miny; $y<=$maxy; $y++) {
                    @file_get_contents("{$base}/tiles/{$ly}/{$z}/{$x}/{$y}.mvt");
                    $count++;
                }
            }
        }
        $this->info("Pre-warmed $count tiles.");
        return self::SUCCESS;
    }
}
