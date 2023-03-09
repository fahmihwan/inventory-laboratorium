<?php

namespace App\Http\Controllers;

use App\Models\Perabot;
use App\Models\Ruangan;
use App\Models\Transaksi_barang_masuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Report_controller extends Controller
{
    public $perabot;
    public function __construct()
    {
        $this->perabot = new Perabot();
    }
    public function report_perabot()
    {
        $datas = Perabot::withCount([
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
        return Inertia::render('Report/Report_perabot', [
            'datas' => $datas
        ]);
    }
    public function report_akl()
    {
        $ruang = 'akl';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        return Inertia::render('Report/Report_akl', [
            'datas' => $datas
        ]);
    }
    public function report_ap()
    {
        $ruang = 'ap';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        return Inertia::render('Report/Report_ap', [
            'datas' => $datas
        ]);
    }
    public function report_tkj()
    {
        $ruang = 'tkj';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();
        return Inertia::render('Report/Report_tkj', [
            'datas' => $datas
        ]);
    }
    public function report_bpd()
    {
        $ruang = 'bpd';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        return Inertia::render('Report/Report_bpd', ['datas' => $datas]);
    }
}
