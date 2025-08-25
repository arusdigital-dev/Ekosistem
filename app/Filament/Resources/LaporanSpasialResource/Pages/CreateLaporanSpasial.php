<?php

namespace App\Filament\Resources\LaporanSpasialResource\Pages;

use App\Filament\Resources\LaporanSpasialResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateLaporanSpasial extends CreateRecord
{
    protected static string $resource = LaporanSpasialResource::class;

    /**
     * Mutasi data sebelum create.
     * - Parse geometry_geojson → $data['geom']
     * - Jika input adalah Feature, ambil field "geometry" di dalamnya
     * - Unset geometry_geojson agar tidak tersimpan ke kolom DB
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (!empty($data['geometry_geojson'])) {
            try {
                // Terima string atau array; kalau array, cek bila itu Feature
                $raw = $data['geometry_geojson'];
                $json = is_array($raw) ? $raw : json_decode($raw, true, flags: JSON_THROW_ON_ERROR);

                if (isset($json['type']) && strtolower($json['type']) === 'feature') {
                    // Ambil properties dari Feature bila props form kosong
                    if (empty($data['props']) && isset($json['properties']) && is_array($json['properties'])) {
                        $data['props'] = $json['properties'];
                    }

                    // Ambil geometry dari Feature
                    $rawGeometry = json_encode($json['geometry'], JSON_THROW_ON_ERROR);
                } else {
                    // Langsung gunakan sebagai Geometry
                    $rawGeometry = is_string($raw) ? $raw : json_encode($json, JSON_THROW_ON_ERROR);
                }

                // Parse ke Geometry (Magellan v2: parser dari container)
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

        // Jangan simpan field form mentah ini ke DB
        unset($data['geometry_geojson']);

        return $data;
    }
}
