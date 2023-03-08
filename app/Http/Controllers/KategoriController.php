<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Kategori::latest()->paginate(5);
        return Inertia::render('Kategori/Index', [
            'datas' => $datas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kategori/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'nama' => 'required',
        ]);

        Kategori::create($data);
        return redirect()->to('/kategori');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        return Inertia::render('Kategori/Edit', [
            'data' => $kategori
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $data = $request->validate([
            'nama' => 'required',
        ]);

        Kategori::where('id', $kategori->id)->update($data);
        return redirect('/kategori');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {

        Kategori::destroy($kategori->id);
        return redirect()->back();
    }
}
