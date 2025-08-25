<?php

namespace App\Filament\Resources\LaporanSpasialResource\Pages;

use App\Filament\Resources\LaporanSpasialResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Validation\ValidationException;

class EditLaporanSpasial extends EditRecord
{
    protected static string $resource = LaporanSpasialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    /**
     * Mutasi data sebelum update (save).
     * - Hanya parse bila geometry_geojson diisi. Jika kosong, biarkan geom lama.
     * - Jika input adalah Feature, ambil field "geometry".
     * - Unset geometry_geojson agar tidak tersimpan ke kolom DB.
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (!empty($data['geometry_geojson'])) {
            try {
                $raw = $data['geometry_geojson'];
                $json = is_array($raw) ? $raw : json_decode($raw, true, flags: JSON_THROW_ON_ERROR);

                if (isset($json['type']) && strtolower($json['type']) === 'feature') {
                    // Merge properties Feature ke props jika props kosong
                    if (empty($data['props']) && isset($json['properties']) && is_array($json['properties'])) {
                        $data['props'] = $json['properties'];
                    }

                    $rawGeometry = json_encode($json['geometry'], JSON_THROW_ON_ERROR);
                } else {
                    $rawGeometry = is_string($raw) ? $raw : json_encode($json, JSON_THROW_ON_ERROR);
                }

                /** @var \Clickbar\Magellan\IO\Parser\Geojson\GeojsonParser $parser */
                $parser = app(\Clickbar\Magellan\IO\Parser\Geojson\GeojsonParser::class);
                $geometry = $parser->parse($rawGeometry);

                $data['geom'] = $geometry;
            } catch (\Throwable $e) {
                throw ValidationException::withMessages([
                    'geometry_geojson' => 'GeoJSON tidak valid: '.$e->getMessage(),
                ]);
            }
        }

        unset($data['geometry_geojson']);

        return $data;
    }
}
