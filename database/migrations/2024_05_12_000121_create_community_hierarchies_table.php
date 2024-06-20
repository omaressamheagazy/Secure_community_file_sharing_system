<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('community_hierarchies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path',1000);
            $table->boolean('is_community')->default(false);
            $table->unsignedBigInteger('entity_id');
            $table->timestamps();
        });
        // DB::statement('ALTER TABLE community_hierarchies ADD COLUMN path LTREE');
        DB::statement('ALTER TABLE community_hierarchies ALTER COLUMN path TYPE "ltree" USING "path"::"ltree";');


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_hierarchies');
    }
};
