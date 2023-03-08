<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaksi_barang_keluar extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    protected $casts = ['tanggal_keluar' => 'datetime:l, d-m-Y'];
    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class);
    }
}
