<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IDRequest;
use App\Http\Requests\Setting\ReligionsRequest;
use App\Http\Requests\Setting\ReligionsUpdateRequest;
use App\Models\Religion;
use Illuminate\Http\JsonResponse;
use Inertia\Response;
use Inertia\Inertia;

class ReligionsController extends Controller
{

    /**
     * Получение и вывод всех религий
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $religions = Religion::get();
        $name = __('messages.religions');

        return Inertia::render('Admin/AdminReligions', compact('religions', 'name'));
    }

    /**
     * Создание религии
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ReligionsRequest $request): JsonResponse
    {
        $religion = Religion::create($request->validated());

        return  response()->json(['result' => __('messages.success'), 'id' => $religion->id]);
    }

    /**
     * @param \App\Http\Requests\Setting\ReligionsUpdateRequest $request
     * @param \App\Models\Religion $religion
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ReligionsUpdateRequest $request): JsonResponse
    {
        Religion::findOrFail($request->id)->update(['content' => $request->content]);

        return response()->json(['result' => __('messages.success')]);
    }

    /**
     * @param \App\Http\Requests\IDRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IDRequest $request): JsonResponse
    {
        Religion::destroy($request->id);

        return response()->json(['result' => __('messages.success')]);
    }
}
