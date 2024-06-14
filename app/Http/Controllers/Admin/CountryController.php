<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Country\CountryCreateRequest;
use App\Http\Requests\Admin\Country\CountryUpdateRequest;
use App\Http\Requests\IDRequest;
use App\Models\Continent;
use App\Models\Country;
use App\Repositories\MenuRepositories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    public function index()
    {
        $countries = (new MenuRepositories())->getContinentsCountries();

        $continents = (new MenuRepositories())->getContinents();

        return Inertia::render('Admin/AdminCountry', compact('continents', 'countries'));
    }

    public function store(CountryCreateRequest $request)
    {
        $country = Country::create([
            'continent_id' => $request->continent_id,
            'name' => $request->name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'slug' => getSlug($request->name)
        ]);

        $continent = $country->continent->name;

        return response()->json(['result' => __('messages.success'), 'id' => $country->id , 'continent' => $continent]);
    }

    public function update(CountryUpdateRequest $request)
    {
        $country = Country::findOrFail($request->id)->update([
            'continent_id' => $request->continent_id,
            'name' => $request->name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'slug' => getSlug($request->name)
        ]);

        return response()->json(['result' => __('messages.success')]);
    }

    public function destroy(IDRequest $request)
    {
        Country::destroy($request->id);

        return response()->json(['result' => __('messages.success')]);
    }
}
