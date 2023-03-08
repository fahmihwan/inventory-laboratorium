<?php

namespace App\Http\Controllers;

use App\Models\Detail_transaksi_barang_keluar;
use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Transaksi_barang_keluar;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Detail_aset_keluarController extends Controller
{
    public function list_and_create(Transaksi_barang_keluar $transaksi_barang_keluar)
    {
        $detail_transaksi_barang_keluar = Detail_transaksi_barang_keluar::select(['id', 'detail_transaksi_barang_masuk_id'])->with([
            'detail_transaksi_barang_masuk.ruangan:id,nama',
            'detail_transaksi_barang_masuk.perabot:id,nama,spesifikasi,kategori_id',
            'detail_transaksi_barang_masuk.perabot.kategori:id,nama',
        ])->latest()->get();

        // with('ruangan:id,nama')->first

        return Inertia::render('Detail_transaksi_keluar/List_and_create', [
            'transaksi_barang_keluar' => $transaksi_barang_keluar,
            'detail_aset_masuks' => Detail_transaksi_barang_masuk::select(['id', 'kode_perabot'])->where('ruangan_id', auth()->user()->ruangan_id)->latest()->get(),
            'detail_transaksi_barang_keluars' => $detail_transaksi_barang_keluar
        ]);
    }

    public function store(Request $request)
    {

        $detail_barang_masuk = Detail_transaksi_barang_masuk::where('kode_perabot', $request->kode_perabot);
        $kode_perabot = $request->kode_perabot;
        $cek_barang = Detail_transaksi_barang_keluar::with('detail_transaksi_barang_masuk')->whereHas('detail_transaksi_barang_masuk', function ($query) use ($kode_perabot) {
            return $query->where('kode_perabot', $kode_perabot);
        });

        if (!$detail_barang_masuk->exists()) {
            return redirect()->back()->withErrors('data tidak ditemukan');
        }

        try {
            DB::beginTransaction();
            if ($cek_barang->exists()) {
                throw new ErrorException('transaksi tidak ada');
            }
            // create detail tranasksi keluar
            Detail_transaksi_barang_keluar::create([
                'detail_transaksi_barang_masuk_id' => $detail_barang_masuk->first()->id,
                'transaksi_barang_keluar_id' => $request->transaksi_barang_keluar_id,
            ]);

            // detail detail tranasksi masuk
            Detail_transaksi_barang_masuk::destroy($detail_barang_masuk->first()->id);

            DB::commit();
        } catch (\ErrorException $th) {
            return redirect()->back()->with('error_message', $th->getMessage());
        }


        return redirect()->back();
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            // resttore
            $detail_transaksi_barang_masuk_id = Detail_transaksi_barang_keluar::where('id', $id)->first()->detail_transaksi_barang_masuk_id;
            Detail_transaksi_barang_masuk::where('id', $detail_transaksi_barang_masuk_id)->restore();

            //delete
            Detail_transaksi_barang_keluar::where('id', $id)->delete();
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->back()->with('error_message', $th->getMessage());
        }
    }

    public function get_detail_aset_masuk_ajax($kode)
    {

        $data = Detail_transaksi_barang_masuk::with(['perabot.kategori:id,nama', 'ruangan:id,nama'])
            ->where('kode_perabot', $kode)
            ->first();
        return $data;
    }
}
