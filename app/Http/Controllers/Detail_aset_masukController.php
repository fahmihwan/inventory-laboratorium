<?php

namespace App\Http\Controllers;

use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Perabot;
use App\Models\Ruangan;
use App\Models\Transaksi_barang_masuk;
use App\Models\User;
use ErrorException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;



class Detail_aset_masukController extends Controller
{
    public function list_and_create(Transaksi_barang_masuk $transaksi_barang_masuk)
    {

        $ruangans = Ruangan::where('id', auth()->user()->ruangan_id)->first();
        // return $ruangans;
        $perabots = Perabot::latest()->get();

        try {
            if ($ruangans->count() == 0) {
                throw new ErrorException('ruangan belum tersedia');
            }
            if ($perabots->count() == 0) {
                throw new ErrorException('perabot belum tersedia');
            }
            if ($transaksi_barang_masuk->count() == null) {
                throw new ErrorException('transaksi tidak ada');
            }
        } catch (\ErrorException $th) {
            return redirect()->back()->with('error_message', $th->getMessage());
        }


        $detail_transaksi_barang_masuks = Detail_transaksi_barang_masuk::with([
            'perabot:id,nama',
            'ruangan:id,nama'
        ])
            // ->where('transaksi_barang_masuk_id', 1)->latest()->get();
            ->where('transaksi_barang_masuk_id', $transaksi_barang_masuk->id)->latest()->get();


        return Inertia::render('Detail_transaksi_masuk/List_and_create', [
            'transaksi_masuk' => $transaksi_barang_masuk::with('ruangan:id,nama')->where('id', $transaksi_barang_masuk->id)->first(),
            'ruangans' => $ruangans,
            'perabots' => $perabots,
            'detail_transaksi_barang_masuks' => $detail_transaksi_barang_masuks,
        ]);
    }

    private function create_no_referens($select_kode_ref)
    {
        if ($select_kode_ref == null) {
            $nota = "LB" . date('Ymd') . "001";
            // dd($nota);
        } else if (substr($select_kode_ref, 8, 2) != date('d')) {
            $nota = "LB" . date('Ymd') . "001";
        } else {
            $cut = (int) substr($select_kode_ref, 10, 3);
            $number = str_pad($cut + 1, 3, "0", STR_PAD_LEFT);
            $nota = "LB" . date('Ymd') . $number;
        }
        return $nota;
    }

    public function store(Request $request)
    {

        $detail_aset_masuk = Detail_transaksi_barang_masuk::orderBy('id', 'DESC');
        if ($detail_aset_masuk->exists()) {
            $no_referensi = $this->create_no_referens($detail_aset_masuk->first()->kode_perabot);
        } else {
            $no_referensi = $this->create_no_referens(null);
        }
        try {
            DB::beginTransaction();
            $data =  $request->validate([
                'ruangan_id' => 'required',
                'perabot_id' => 'required',
                'kondisi' => 'required',
                'transaksi_barang_masuk_id' => 'required',
            ]);
            $data['kode_perabot'] = $no_referensi;
            Detail_transaksi_barang_masuk::create($data);
            DB::commit();
        } catch (\Throwable $th) {
            return redirect()->back()->with('error_message', $th->getMessage());
        }

        return redirect()->back();
    }

    public function destroy($id)
    {
        Detail_transaksi_barang_masuk::where('id', $id)->forceDelete();
        return redirect()->back();
    }
    public function get_spesifikasi($id)
    {
        $data = Perabot::with(['kategori:id,nama'])->where('id', $id)->select('id', 'nama', 'spesifikasi', 'kategori_id')->first();
        return $data;
    }
}
