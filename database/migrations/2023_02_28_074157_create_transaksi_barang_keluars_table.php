<?php

use App\Models\Ruangan;
use App\Models\User;
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
        Schema::create('transaksi_barang_keluars', function (Blueprint $table) {
            $table->id();
            $table->string('kode_transaksi_keluar')->unique();
            $table->date('tanggal_keluar');
            $table->string('keterangan');
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Ruangan::class);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_barang_keluars');
    }
};
