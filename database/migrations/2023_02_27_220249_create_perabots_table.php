<?php

use App\Models\Kategori;
use App\Models\Perabot;
use App\Models\Ruangan;
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
        Schema::create('perabots', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('spesifikasi');
            $table->foreignIdFor(Kategori::class);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perabots');
    }
};
