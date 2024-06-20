<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name', 500);
            $table->string('mime');
            $table->integer('size');
            $table->string('path')->nullable();
            $table->text('secret_key');
            $table->text('iv');
            $table->foreignId('owner_id')
                  ->constrained('users')
                  ->onDelete('CASCADE');
            $table->foreignId('parent_id')
                  ->nullable()
                  ->constrained('communities')
                  ->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
