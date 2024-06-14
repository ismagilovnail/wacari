<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Continent;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class NavigationController extends Controller
{
    /**
     * Получение меню навигации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNavigate(): JsonResponse
    {
        $continents = Continent::with('country')->get();

        return response()->json(['continents' => $continents]);
    }
}
