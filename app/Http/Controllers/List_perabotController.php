<?php

namespace App\Http\Controllers;

use App\Models\Detail_transaksi_barang_masuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class List_perabotController extends Controller
{
    public function index()
    {
        $data = Detail_transaksi_barang_masuk::with(['perabot.kategori:id,nama', 'ruangan:id,nama'])->where('ruangan_id', auth()->user()->ruangan_id)->latest()->paginate(5);

        return Inertia::render('List_perabot/Index', [
            'datas' => $data
        ]);
    }
    public function update(Request $request, $id)
    {
        Detail_transaksi_barang_masuk::where('id', $id)->update([
            'kondisi' => $request->kondisi
        ]);
        return redirect()->back();
    }
}
