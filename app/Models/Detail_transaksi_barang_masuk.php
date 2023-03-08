<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detail_transaksi_barang_masuk extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    protected $casts = ['created_at' => 'datetime:l, d-m-Y'];

    public function perabot()
    {
        return $this->belongsTo(Perabot::class);
    }
    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class);
    }
}
