<?php

namespace App\Http\Controllers;

use App\Repositories\MenuRepositories;
use Inertia\Inertia;
use Inertia\Response;

class BiographyController extends Controller
{
    /**
     * Получение формы для биографии
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        $continent = (new MenuRepositories())->getContinents();
        $country = (new MenuRepositories())->getCountries();
        $tips = (new MenuRepositories())->getTips();

        return Inertia::render('Public/CreateBiography/Biography',
            compact('continent', 'country', 'tips'));
    }
}

