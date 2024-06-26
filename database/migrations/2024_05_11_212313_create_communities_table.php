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
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('inherits_permission')->default(true);
            $table->text('public_key')->nullable();
            $table->text('private_key')->nullable();
            $table->foreignId('user_id')
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
        Schema::dropIfExists('communities');
    }
};
