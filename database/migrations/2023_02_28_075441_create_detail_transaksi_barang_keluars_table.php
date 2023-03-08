<?php

use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Perabot;
use App\Models\Transaksi_barang_keluar;
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
        Schema::create('detail_transaksi_barang_keluars', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Detail_transaksi_barang_masuk::class);
            $table->foreignIdFor(Transaksi_barang_keluar::class);
            $table->enum('kondisi', ['baik', 'rusak ringan', 'rusak berat']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_transaksi_barang_keluars');
    }
};
