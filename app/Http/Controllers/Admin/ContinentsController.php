<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Continents\ContinentsCreateRequest;
use App\Http\Requests\Admin\Continents\ContinentsUpdateRequest;
use App\Http\Requests\IDRequest;
use App\Models\Continent;
use App\Repositories\MenuRepositories;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContinentsController extends Controller
{
    /**
     * Получение страницы с континентами
     *
     * @return \Inertia\Response;
     */
    public function index(): Response
    {
        $continents = (new MenuRepositories())->getContinents();

        return Inertia::render('Admin/AdminContinents', compact('continents'));
    }

    /**
     * Создание континента
     *
     * @param \App\Http\Requests\Admin\Continents\ContinentsCreateRequest $request
     * @return \Illuminate\Http\JsonResponse;
     */
    public function store(ContinentsCreateRequest $request): JsonResponse
    {
        Continent::create([
            'name' => $request->name,
            'slug' => getSlug($request->name)
        ]);

        return  response()->json(['result' => __('messages.success')]);
    }

    /**
     * @param \App\Http\Requests\Admin\Continents\ContinentsUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse;
     */
    public function update(ContinentsUpdateRequest $request): JsonResponse
    {
        Continent::findOrFail($request->id)->update([
            'name' => $request->name,
            'slug' => getSlug($request->name)
        ]);

        return  response()->json(['result' => __('messages.success')]);
    }

    public function destroy(IDRequest $request): JsonResponse
    {
        Continent::destroy($request->id);

        return  response()->json(['result' => __('messages.success')]);
    }
}
