<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Perabot extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    protected $casts = ['created_at' => 'datetime:l, d-m-Y'];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function detail_transaksi_barang_masuks()
    {
        return $this->hasMany(Detail_transaksi_barang_masuk::class)->withTrashed();
    }

    public  function report_all_rooms($ruangan_id)
    {
        return  $this->whereHas('detail_transaksi_barang_masuks', function ($query) use ($ruangan_id) {
            return $query->where('ruangan_id', $ruangan_id);
        })
            ->withCount([
                'detail_transaksi_barang_masuks as count_baik' => function ($query) use ($ruangan_id) {
                    return $query->where([
                        ['kondisi', '=', 'baik'],
                        ['ruangan_id', '=', $ruangan_id],
                    ]);
                },
                'detail_transaksi_barang_masuks as count_rusak_ringan' => function ($query) use ($ruangan_id) {
                    return $query->where([
                        ['kondisi', '=', 'rusak ringan'],
                        ['ruangan_id', '=', $ruangan_id],
                    ]);
                },
                'detail_transaksi_barang_masuks as count_rusak_berat' => function ($query)  use ($ruangan_id) {
                    return $query->where([
                        ['kondisi', '=', 'rusak berat'],
                        ['ruangan_id', '=', $ruangan_id],
                    ]);
                },
                'detail_transaksi_barang_masuks as count_total' => function ($query)  use ($ruangan_id) {
                    return $query->where([
                        ['ruangan_id', '=', $ruangan_id],
                    ]);
                },
            ]);
        // ->get();
    }
}
