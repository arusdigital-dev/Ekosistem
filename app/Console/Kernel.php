<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    // OPSIONAL: kalau auto-discovery mati, daftarkan di sini
    protected $commands = [
        \App\Console\Commands\TileCacheCommand::class,
    ];

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
