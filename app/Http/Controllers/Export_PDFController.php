<?php

namespace App\Http\Controllers;

use App\Models\Perabot;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use App\Pegawai;

use PDF;

class Export_PDFController extends Controller
{
    public $perabot;
    public function __construct()
    {
        $this->perabot = new Perabot();
    }
    public function print_perabot()
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

        $pdf = PDF::loadview('pdf.report_perabot', [
            'title' => 'SEMUA DATA ASET',
            'datas' => $datas
        ]);
        return $pdf->download('report');
    }
    public function print_akl()
    {
        $ruang = 'akl';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        $pdf = PDF::loadview('pdf.report_akl', [
            'title' => 'LAB AKUNTANSI DAN KEUANGAN LEMBAGA',
            'datas' => $datas
        ]);
        return $pdf->download('report');
    }
    public function print_ap()
    {
        $ruang = 'ap';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        $pdf = PDF::loadview('pdf.report_ap', [
            'title' => 'LAB ADMINISTRASI PUBLIK',
            'datas' => $datas
        ]);
        return $pdf->download('report');
    }
    public function print_tkj()
    {
        $ruang = 'tkj';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        $pdf = PDF::loadview('pdf.report_tkj', [
            'title' => 'LAB TEKNIK KOMPUTER DAN JARINGAN',
            'datas' => $datas
        ]);
        return $pdf->download('report');
    }
    public function print_bpd()
    {
        $ruang = 'bpd';
        $ruangan_id = Ruangan::where('nama', 'LIKE', '%' . $ruang . '%')->first()->id;
        $datas =  $this->perabot->report_all_rooms($ruangan_id)->get();

        $pdf = PDF::loadview('pdf.report_bpd', [
            'title' => 'LAB BISNIS DAN PEMASARAN',
            'datas' => $datas
        ]);
        return $pdf->download('report');
    }
}
