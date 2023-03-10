<?php

namespace App\Http\Controllers;

use App\Helpers\KodeHelper;
use App\Models\Detail_transaksi_barang_keluar;
use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Transaksi_barang_keluar as ModelsTransaksi_barang_keluar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Transaksi_barang_keluar extends Controller
{
    public function index()
    {
        $data =  ModelsTransaksi_barang_keluar::with('ruangan:id,nama')->latest()->paginate(5);
        return Inertia::render('Transaksi_keluar/Index', [
            'datas' => $data
        ]);
    }

    public function create()
    {
        $get_kode = ModelsTransaksi_barang_keluar::orderBy('id', 'desc');
        if ($get_kode->exists()) {
            $no_referensi = KodeHelper::transaksi_keluar($get_kode->first()->kode_transaksi_keluar);
        } else {
            $no_referensi = KodeHelper::transaksi_keluar(null);
        }

        return Inertia::render('Transaksi_keluar/Create', [
            'no_referensi' => $no_referensi
        ]);
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'kode_transaksi_keluar' => 'required',
            'tanggal_keluar' => 'required',
            'keterangan' => 'required',
        ]);
        $data['user_id'] = auth()->user()->id;
        $data['ruangan_id'] = auth()->user()->ruangan_id;
        ModelsTransaksi_barang_keluar::create($data);
        return redirect('/transaksi_aset_keluar');
    }

    public function edit(ModelsTransaksi_barang_keluar $transaksi_barang_keluar)
    {
        return Inertia::render('Transaksi_keluar/Edit', [
            'data' => $transaksi_barang_keluar
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'kode_transaksi_keluar' => 'required',
            'tanggal_keluar' => 'required',
            'keterangan' => 'required',
        ]);

        ModelsTransaksi_barang_keluar::where('id', $id)->update($data);
        return redirect('/transaksi_aset_keluar');
    }
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $dbk = Detail_transaksi_barang_keluar::where('transaksi_barang_keluar_id', $id)->get();
            foreach ($dbk as $dtbmid) {
                Detail_transaksi_barang_masuk::where('id', $dtbmid['detail_transaksi_barang_masuk_id'])->forceDelete();
            }
            Detail_transaksi_barang_keluar::where('transaksi_barang_keluar_id', $id)->delete();
            ModelsTransaksi_barang_keluar::where('id', $id)->delete();
            DB::commit();
        } catch (\Throwable $th) {
            return redirect()->back()->with('error_message', $th->getMessage());
        }

        return redirect()->back();
    }
}
