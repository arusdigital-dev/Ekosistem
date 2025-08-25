<?php

namespace App\Filament\Resources\LaporanSpasialResource\Pages;

use App\Filament\Resources\LaporanSpasialResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLaporanSpasials extends ListRecords
{
    protected static string $resource = LaporanSpasialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
