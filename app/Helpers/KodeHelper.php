<?php

namespace App\Helpers;

class KodeHelper
{
    public static function perabot($select_kode_ref)
    {
        if ($select_kode_ref == null) {
            $nota = "LB" . date('Ymd') . "001";
        } else if (substr($select_kode_ref, 8, 2) != date('d')) {
            $nota = "LB" . date('Ymd') . "001";
        } else {
            $cut = (int) substr($select_kode_ref, 10, 3);
            $number = str_pad($cut + 1, 3, "0", STR_PAD_LEFT);
            $nota = "LB" . date('Ymd') . $number;
        }
        return $nota;
    }

    public static function transaksi_keluar($select_kode_ref)
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

    public static function transaksi_masuk($select_kode_ref)
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
}
