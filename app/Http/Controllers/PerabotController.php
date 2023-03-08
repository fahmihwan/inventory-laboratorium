<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Perabot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerabotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Perabot::with('kategori:id,nama')->latest()->paginate(5);
        return Inertia::render('Perabot/Index', [
            'datas' => $datas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Perabot/Create', [
            'kategories' => Kategori::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required',
            'kategori_id' => 'required',
            'spesifikasi' => 'required'
        ]);
        Perabot::create($data);
        return redirect('/perabot');
    }

    /**
     * Display the specified resource.
     */
    public function show(Perabot $perabot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Perabot $perabot)
    {
        return Inertia::render('Perabot/Edit', [
            'kategories' => Kategori::latest()->get(),
            'data' => $perabot
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Perabot $perabot)
    {

        $data = $request->validate([
            'nama' => 'required',
            'kategori_id' => 'required',
            'spesifikasi' => 'required'
        ]);

        Perabot::where('id', $perabot->id)->update($data);
        return redirect('/perabot');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Perabot $perabot)
    {
        Perabot::destroy($perabot->id);
        return redirect()->back();
    }
}
