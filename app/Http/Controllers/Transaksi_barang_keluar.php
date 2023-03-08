<?php

namespace App\Http\Controllers;

use App\Models\Transaksi_barang_keluar as ModelsTransaksi_barang_keluar;
use Illuminate\Http\Request;
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
            $no_referensi = $this->create_no_referens($get_kode->first()->kode_transaksi_keluar);
        } else {
            $no_referensi = $this->create_no_referens(null);
        }
        return Inertia::render('Transaksi_keluar/Create', [
            'no_referensi' => $no_referensi
        ]);
    }
    private function create_no_referens($select_kode_ref)
    {
        if ($select_kode_ref == null) {
            $nota = "TKL" . date('Ymd') . "001";
        } else if (substr($select_kode_ref, 9, 2) != date('d')) {
            $nota = "TKL" . date('Ymd') . "001";
        } else {
            $cut = (int)substr($select_kode_ref, 11, 3);
            $number = str_pad($cut + 1, 3, "0", STR_PAD_LEFT);;
            $nota = "TKL" . date('Ymd') . $number;
        }
        return $nota;
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
        ModelsTransaksi_barang_keluar::destroy($id);
        return redirect()->back();
    }
}
