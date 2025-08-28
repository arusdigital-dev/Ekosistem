<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Pastikan fungsi trigger ada
        DB::statement("
        CREATE OR REPLACE FUNCTION ensure_geom_3857() RETURNS trigger AS $$
        BEGIN
          IF NEW.geom IS NULL THEN
            NEW.geom_3857 := NULL;
          ELSE
            IF ST_SRID(NEW.geom)=3857 THEN
              NEW.geom_3857 := NEW.geom;
            ELSIF ST_SRID(NEW.geom)=4326 THEN
              NEW.geom_3857 := ST_Transform(NEW.geom,3857);
            ELSE
              NEW.geom_3857 := ST_Transform(ST_SetSRID(NEW.geom,4326),3857);
            END IF;
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        ");

        foreach (['mangrove','lamun','dugong','laporan_spasial'] as $t) {
            // 1) Tambah kolom kalau belum ada
            DB::statement("ALTER TABLE {$t} ADD COLUMN IF NOT EXISTS geom_3857 geometry(Geometry,3857)");

            // 2) Isi awal dari geom
            DB::statement("
            UPDATE {$t}
            SET geom_3857 = CASE
              WHEN ST_SRID(geom)=3857 THEN geom
              WHEN ST_SRID(geom)=4326 THEN ST_Transform(geom, 3857)
              WHEN ST_SRID(geom)=0    THEN ST_Transform(ST_SetSRID(geom,4326),3857)
              ELSE ST_Transform(geom,3857)
            END
            WHERE geom IS NOT NULL AND geom_3857 IS NULL
            ");

            // 3) Trigger sinkron
            DB::statement("DROP TRIGGER IF EXISTS trg_geom_3857_{$t} ON {$t}");
            DB::statement("
            CREATE TRIGGER trg_geom_3857_{$t}
            BEFORE INSERT OR UPDATE ON {$t}
            FOR EACH ROW EXECUTE FUNCTION ensure_geom_3857()
            ");

            // 4) Index spasial
            DB::statement("CREATE INDEX IF NOT EXISTS idx_{$t}_geom3857 ON {$t} USING GIST (geom_3857)");
        }
    }

    public function down(): void
    {
        foreach (['mangrove','lamun','dugong','laporan_spasial'] as $t) {
            DB::statement("DROP INDEX IF EXISTS idx_{$t}_geom3857");
            DB::statement("DROP TRIGGER IF EXISTS trg_geom_3857_{$t} ON {$t}");
            DB::statement("ALTER TABLE {$t} DROP COLUMN IF EXISTS geom_3857");
        }
        DB::statement("DROP FUNCTION IF EXISTS ensure_geom_3857()");
    }
};
