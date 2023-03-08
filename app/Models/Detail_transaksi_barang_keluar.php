<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_transaksi_barang_keluar extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function detail_transaksi_barang_masuk()
    {
        return $this->belongsTo(Detail_transaksi_barang_masuk::class)->withTrashed();
    }
}
