<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IDRequest;
use App\Http\Requests\Tips\TipsStoreRequest;
use App\Http\Requests\Tips\TipsUpdateRequest;
use App\Models\Tip;
use App\Repositories\MenuRepositories;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class TipsController extends Controller
{
    /**
     * Получение страницы со всеми подсказками
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $tips = (new MenuRepositories())->getTips();
        $name = __('messages.tips');

        return Inertia::render('Admin/AdminTips', compact('tips', 'name'));
    }

    /**
     * @param \App\Http\Requests\Tips\TipsStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TipsStoreRequest $request): JsonResponse
    {
        $tips = Tip::create([
            'slug' => getSlug(str_replace('*', '', $request->title)),
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return  response()->json(['result' => __('messages.success'), 'id' => $tips->id]);
    }

    /**
     * @param \App\Http\Requests\Tips\TipsUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TipsUpdateRequest $request): JsonResponse
    {
        Tip::findOrFail($request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return  response()->json(['result' => __('messages.success')]);
    }

    /**
     * Удаление подсказки
     *
     * @param \App\Http\Requests\IDRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IDRequest $request): JsonResponse
    {
        Tip::destroy($request->id);

        return  response()->json(['result' => __('messages.success')]);
    }
}
