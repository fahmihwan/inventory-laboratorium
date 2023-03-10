<?php

namespace App\Http\Controllers;

use App\Helpers\KodeHelper;
use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Perabot;
use App\Models\Ruangan;
use App\Models\Transaksi_barang_masuk;
use App\Models\User;
use ErrorException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PHPUnit\Framework\MockObject\ReturnValueNotConfiguredException;

class Detail_aset_masukController extends Controller
{
    public function list_and_create(Transaksi_barang_masuk $transaksi_barang_masuk)
    {

        $ruangans = Ruangan::where('id', auth()->user()->ruangan_id)->first();
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
            ->where('transaksi_barang_masuk_id', $transaksi_barang_masuk->id)->withTrashed()->latest()->get();



        return Inertia::render('Detail_transaksi_masuk/List_and_create', [
            'transaksi_masuk' => $transaksi_barang_masuk::with('ruangan:id,nama')->where('id', $transaksi_barang_masuk->id)->first(),
            'ruangans' => $ruangans,
            'perabots' => $perabots,
            'detail_transaksi_barang_masuks' => $detail_transaksi_barang_masuks,
        ]);
    }


    public function store(Request $request)
    {

        $detail_aset_masuk = Detail_transaksi_barang_masuk::withTrashed()->orderBy('id', 'DESC');

        if ($detail_aset_masuk->exists()) {
            $no_referensi = KodeHelper::perabot($detail_aset_masuk->first()->kode_perabot);
        } else {
            $no_referensi = KodeHelper::perabot(null);
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
