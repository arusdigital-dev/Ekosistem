<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LaporanSpasialResource\Pages;
use App\Models\Category;
use App\Models\GIS\LaporanSpasial;
use Clickbar\Magellan\Data\Geometries\{Geometry, Point, Polygon, MultiPolygon};
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class LaporanSpasialResource extends Resource
{
    protected static ?string $model = LaporanSpasial::class;

    protected static ?string $navigationIcon = 'heroicon-o-map';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('category_id')
                ->label('Category')
                ->options(fn () => Category::query()->pluck('name', 'id')->toArray())
                ->searchable()
                ->required(),

            Forms\Components\Textarea::make('geometry_geojson')
                ->label('Geometry (GeoJSON Geometry/Feature)')
                ->rows(6)
                ->helperText('Tempel GeoJSON Point / Polygon / MultiPolygon (SRID 4326).')
                // Saat edit, tampilkan kembali sebagai GeoJSON string agar bisa diubah
                ->afterStateHydrated(function (Forms\Components\Textarea $component, $state) {
                    /** @var LaporanSpasial|null $record */
                    $record = $component->getRecord();
                    if (!$record?->geom instanceof Geometry) {
                        return;
                    }

                    // Opsi termudah di Magellan v2: serialisasi default → GeoJSON
                    $component->state(json_encode($record->geom));

                    // Jika ingin eksplisit generator:
                    // $component->state((new \Clickbar\Magellan\IO\Generator\Geojson\GeojsonGenerator())->generate($record->geom));
                })
                ->required(),

            Forms\Components\KeyValue::make('props')
                ->label('Props (opsional)')
                ->keyLabel('key')
                ->valueLabel('value'),

            Forms\Components\Select::make('status')
                ->options([
                    'pending'  => 'pending',
                    'approved' => 'approved',
                    'rejected' => 'rejected',
                ])
                ->default('pending')
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable()
                    ->searchable(),
                // BadgeColumn deprecated → pakai TextColumn + badge()
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        'pending'  => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        default    => 'secondary',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'pending'  => 'pending',
                    'approved' => 'approved',
                    'rejected' => 'rejected',
                ]),
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->color('success')
                    ->visible(fn (LaporanSpasial $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(function (LaporanSpasial $record): void {
                        $record->update([
                            'status'      => 'approved',
                            'verified_by' => Auth::id() ?? 1,
                            'verified_at' => now(),
                        ]);

                        // materialize ke layer domain
                        $cat = $record->category;
                        if (!$cat) return;

                        switch (strtolower($cat->name)) {
                            case 'mangrove':
                                if ($multi = self::asMultiPolygon($record->geom)) {
                                    \App\Models\GIS\Mangrove::create([
                                        'name'  => 'Laporan '.$record->id,
                                        'props' => $record->props,
                                        'geom'  => $multi,
                                    ]);
                                }
                                break;

                            case 'lamun':
                                if ($multi = self::asMultiPolygon($record->geom)) {
                                    \App\Models\GIS\Lamun::create([
                                        'name'  => 'Laporan '.$record->id,
                                        'props' => $record->props,
                                        'geom'  => $multi,
                                    ]);
                                }
                                break;

                            case 'dugong':
                                if ($record->geom instanceof Point) {
                                    \App\Models\GIS\Dugong::create([
                                        'props'       => $record->props,
                                        'geom'        => $record->geom,
                                        'observed_at' => now(),
                                    ]);
                                }
                                break;
                        }
                    }),

                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->visible(fn (LaporanSpasial $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(fn (LaporanSpasial $record) => $record->update([
                        'status'      => 'rejected',
                        'verified_by' => Auth::id() ?? 1,
                        'verified_at' => now(),
                    ])),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListLaporanSpasials::route('/'),
            'create' => Pages\CreateLaporanSpasial::route('/create'),
            'edit'   => Pages\EditLaporanSpasial::route('/{record}/edit'),
        ];
    }

    /** helper konversi geometry → MultiPolygon kalau memungkinkan */
    protected static function asMultiPolygon(?Geometry $g): ?MultiPolygon
    {
        if ($g instanceof MultiPolygon) return $g;
        if ($g instanceof Polygon)     return MultiPolygon::make([$g]);
        return null;
    }
}
