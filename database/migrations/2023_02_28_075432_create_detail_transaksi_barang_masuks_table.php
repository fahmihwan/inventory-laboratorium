<?php


use App\Models\Perabot;
use App\Models\Ruangan;
use App\Models\Transaksi_barang_masuk;
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
        Schema::create('detail_transaksi_barang_masuks', function (Blueprint $table) {
            $table->id();
            $table->string('kode_perabot')->unique();
            $table->foreignIdFor(Perabot::class);
            $table->enum('kondisi', ['baik', 'rusak ringan', 'rusak berat']);
            $table->foreignIdFor(Ruangan::class);
            $table->foreignIdFor(Transaksi_barang_masuk::class);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_transaksi_barang_masuks');
    }
};
