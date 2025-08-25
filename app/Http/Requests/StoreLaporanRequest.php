<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Clickbar\Magellan\Http\Concerns\TransformsGeojsonGeometry;
use Clickbar\Magellan\Http\Rules\GeometryGeojsonRule;
use Clickbar\Magellan\Data\Geometries\{Point, Polygon, MultiPolygon};
use Clickbar\Magellan\Http\Requests\TransformsGeojsonGeometry as RequestsTransformsGeojsonGeometry;
use Clickbar\Magellan\Rules\GeometryGeojsonRule as RulesGeometryGeojsonRule;

class StoreLaporanRequest extends FormRequest
{
    use RequestsTransformsGeojsonGeometry;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required','integer','exists:categories,id'],
            'geometry'    => ['required', new RulesGeometryGeojsonRule([Point::class, Polygon::class, MultiPolygon::class])],
            'nama'        => ['nullable','string'],
            'email'       => ['nullable','email'],
            'telepon'     => ['nullable','string'],
            'tanggal'     => ['nullable','date'],
            'waktu'       => ['nullable'],
            'kondisi'     => ['nullable','string'],
            'detail_lokasi' => ['nullable','string'],
            'deskripsi_laporan' => ['nullable','string'],
            'gambar'      => ['nullable','string'],
        ];
    }

    public function geometries(): array
    {
        return ['geometry']; // otomatis di-cast ke objek Geometry Magellan
    }
}
