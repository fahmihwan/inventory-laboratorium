<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class Report_controller extends Controller
{
    public function report_perabot()
    {
        return Inertia::render('Report/Report_perabot');
    }
    public function report_adk()
    {
        return Inertia::render('Report/Report_adk');
    }
    public function report_ap()
    {
        return Inertia::render('Report/Report_ap');
    }
    public function report_bpd()
    {
        return Inertia::render('Report/Report_bpd');
    }
}
