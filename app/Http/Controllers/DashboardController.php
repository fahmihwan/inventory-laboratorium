<?php

namespace App\Http\Controllers;

use App\Models\Perabot;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $list_perabot = Perabot::select(['id', 'nama'])->withCount([
            'detail_transaksi_barang_masuks as count_baik' => function ($query) {
                return $query->where([
                    ['kondisi', '=', 'baik'],
                ]);
            },
            'detail_transaksi_barang_masuks as count_rusak_ringan' => function ($query) {
                return $query->where([
                    ['kondisi', '=', 'rusak ringan'],
                ]);
            },
            'detail_transaksi_barang_masuks as count_rusak_berat' => function ($query) {
                return $query->where([
                    ['kondisi', '=', 'rusak berat'],
                ]);
            },
            'detail_transaksi_barang_masuks as count_total',
        ])->get();

        $arr = [];
        foreach ($list_perabot as $data) {
            $arr[] = [
                'name' => $data['nama'],
                'total' => $data['count_total'],
                'baik' => $data['count_baik'],
                'rusak_ringan' => $data['count_rusak_ringan'],
                'rusak_berat' => $data['count_rusak_berat'],
            ];
        }


        return Inertia::render('Dashboard', [
            'list_perabot' => $arr
        ]);
    }
}
