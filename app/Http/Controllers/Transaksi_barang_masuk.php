<?php

namespace App\Http\Controllers;

use App\Models\Detail_transaksi_barang_masuk;
use App\Models\Transaksi_barang_masuk as ModelsTransaksi_barang_masuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Transaksi_barang_masuk extends Controller
{
    public function index()
    {
        $data =  ModelsTransaksi_barang_masuk::with(['user:id', 'ruangan:id,nama'])->latest()->paginate(5);
        return Inertia::render('Transaksi_masuk/Index', [
            'datas' => $data
        ]);
    }

    public function create()
    {
        $get_kode = ModelsTransaksi_barang_masuk::orderBy('id', 'desc');
        if ($get_kode->exists()) {
            $no_referensi = $this->create_no_referens($get_kode->first()->kode_transaksi_masuk);
        } else {
            $no_referensi = $this->create_no_referens(null);
        }

        return Inertia::render('Transaksi_masuk/Create', [
            'no_referensi' => $no_referensi
        ]);
    }

    private function create_no_referens($select_kode_ref)
    {
        if ($select_kode_ref == null) {
            $nota = "TMS" . date('Ymd') . "001";
        } else if (substr($select_kode_ref, 9, 2) != date('d')) {
            $nota = "TMS" . date('Ymd') . "001";
        } else {
            $cut = (int)substr($select_kode_ref, 11, 3);
            $number = str_pad($cut + 1, 3, "0", STR_PAD_LEFT);;
            $nota = "TMS" . date('Ymd') . $number;
        }
        return $nota;
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'kode_transaksi_masuk' => 'required',
            'tanggal_masuk' => 'required',
            'keterangan' => 'required',
        ]);
        $data['user_id'] = auth()->user()->id;
        $data['ruangan_id'] = auth()->user()->ruangan_id;
        ModelsTransaksi_barang_masuk::create($data);
        return redirect('/transaksi_aset_masuk');
    }


    public function edit(ModelsTransaksi_barang_masuk $transaksi_barang_masuk)
    {
        return Inertia::render('Transaksi_masuk/Edit', [
            'data' => $transaksi_barang_masuk
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'kode_transaksi_masuk' => 'required',
            'tanggal_masuk' => 'required',
            'keterangan' => 'required',
        ]);

        ModelsTransaksi_barang_masuk::where('id', $id)->update($data);
        return redirect('/transaksi_aset_masuk');
    }
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            ModelsTransaksi_barang_masuk::destroy($id);
            Detail_transaksi_barang_masuk::where('transaksi_barang_masuk_id', $id)->delete();

            DB::commit();
            //code
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withErrors($th->getMessage());
        }

        return redirect()->back();
    }
}
