<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Формируем главную страницу
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $countBiography = 3000;

        return Inertia::render('Home', compact('countBiography'));
    }
}
