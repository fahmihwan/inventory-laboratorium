<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Detail_aset_keluarController;
use App\Http\Controllers\Detail_aset_masukController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\List_perabotController;
use App\Http\Controllers\PerabotController;
use App\Http\Controllers\Report_controller;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\Transaksi_barang_keluar;
use App\Http\Controllers\Transaksi_barang_masuk;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Dashboard');
// });

Route::get('/', [AuthController::class, 'login']);
Route::post('/account/authenticate', [AuthController::class, 'authenticate']);




Route::middleware(['auth',])->group(function () {
    Route::get('/account', [AuthController::class, 'index']);
    Route::get('/account/create', [AuthController::class, 'create']);
    Route::post('/account', [AuthController::class, 'store']);
    Route::delete('/account/{id}', [AuthController::class, 'destroy']);
    Route::post('/account/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    // MASTER DATA
    Route::resource('/kategori', KategoriController::class);
    Route::resource('/perabot', PerabotController::class);
    Route::resource('/ruangan', RuanganController::class);

    Route::get('/list_perabot', [List_perabotController::class, 'index']);
    Route::put('/list_perabot/{id}', [List_perabotController::class, 'update']);

    // TRANSKSI
    // transaksi aset masuk
    Route::get('/transaksi_aset_masuk', [Transaksi_barang_masuk::class, 'index']);
    Route::get('/transaksi_aset_masuk/create', [Transaksi_barang_masuk::class, 'create']);
    Route::post('/transaksi_aset_masuk', [Transaksi_barang_masuk::class, 'store']);
    Route::get('/transaksi_aset_masuk/{transaksi_barang_masuk}/edit', [Transaksi_barang_masuk::class, 'edit']);
    Route::put('/transaksi_aset_masuk/{id}', [Transaksi_barang_masuk::class, 'update']);
    Route::delete('/transaksi_aset_masuk/{id}', [Transaksi_barang_masuk::class, 'destroy']);

    Route::get('/detail_transaksi_masuk/{transaksi_barang_masuk}/create', [Detail_aset_masukController::class, 'list_and_create']);
    Route::post('/detail_transaksi_masuk', [Detail_aset_masukController::class, 'store']);
    Route::delete('/detail_transaksi_masuk/{id}', [Detail_aset_masukController::class, 'destroy']);
    // get ajax
    // get_spesifikasi
    Route::get('/detail_transaksi_masuk/{id}/get', [Detail_aset_masukController::class, 'get_spesifikasi']);


    // transaksi aset keluar
    Route::get('/transaksi_aset_keluar', [Transaksi_barang_keluar::class, 'index']);
    Route::get('/transaksi_aset_keluar/create', [Transaksi_barang_keluar::class, 'create']);
    Route::post('/transaksi_aset_keluar', [Transaksi_barang_keluar::class, 'store']);
    Route::get('/transaksi_aset_keluar/{transaksi_barang_keluar}/edit', [Transaksi_barang_keluar::class, 'edit']);
    Route::put('/transaksi_aset_keluar/{id}', [Transaksi_barang_keluar::class, 'update']);
    Route::delete('/transaksi_aset_keluar/{id}', [Transaksi_barang_keluar::class, 'destroy']);

    Route::get('/detail_transaksi_keluar/{transaksi_barang_keluar}/create', [Detail_aset_keluarController::class, 'list_and_create']);
    Route::post('/detail_transaksi_keluar', [Detail_aset_keluarController::class, 'store']);
    Route::delete('/detail_transaksi_keluar/{id}', [Detail_aset_keluarController::class, 'destroy']);
    // get ajax
    Route::get('/detail_transaksi_keluar/{id}/get', [Detail_aset_keluarController::class, 'get_detail_aset_masuk_ajax']);
    Route::get('/detail_transaksi_keluar/{id}/search', [Detail_aset_keluarController::class, 'search_kode_detail_aset_masuk_ajax']);

    Route::get('/laporan/list-perabot', [Report_controller::class, 'report_perabot']);
    Route::get('/laporan/list-adk', [Report_controller::class, 'report_adk']);
    Route::get('/laporan/list-ap', [Report_controller::class, 'report_ap']);
    Route::get('/laporan/list-bpd', [Report_controller::class, 'report_bpd']);
});


Route::get('/demo/create', [AuthController::class, function () {
    return view('demo.create');
}]);

Route::post('demo/store', [AuthController::class, 'store']);
