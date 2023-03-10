<?php

namespace App\Http\Controllers;

use App\Models\Ruangan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }
        return redirect()->back()->with('error_message', 'username atau password salah');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function index()
    {
        $datas = User::with(['ruangan:id,nama'])->latest()->paginate(5);
        return Inertia::render('Auth/Index', [
            'datas' => $datas
        ]);
    }

    public function create()
    {
        $ruangans = Ruangan::latest()->get();
        return Inertia::render('Auth/Create', [
            'ruangans' => $ruangans
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'nama' => 'required',
            'username' => 'required|unique:users,username',
            'hak_akses' => 'required',
            'password' => 'required',
        ];

        if ($request->hak_akses != 'sarpras') {
            $rules['ruangan_id'] = ' required';
        }
        // return $request;
        $validated =  $request->validate($rules);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);
        return redirect('/account');
    }

    public function edit(User $user)
    {
        $user = User::with('ruangan')->where('id', $user->id)->first();
        $ruangans = Ruangan::latest()->get();
        return Inertia::render('Auth/Edit', [
            'ruangans' => $ruangans,
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {

        $rules = [
            'nama' => 'required',
            'username' => 'required'
        ];
        if ($request->changePassword) {
            $rules['password'] = 'required';
        }
        $validated = $request->validate($rules);
        if ($request->changePassword) {
            $validated['password'] = Hash::make($request->password);
        }
        User::where('id', $id)->update($validated);
        return redirect('/account');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return redirect()->back();
    }
}
