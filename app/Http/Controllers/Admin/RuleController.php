<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Rule\RuleCreateRequest;
use App\Http\Requests\Admin\Rule\RuleUpdateRequest;
use App\Http\Requests\IDRequest;
use App\Models\Admin\Rule;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class RuleController extends Controller
{
    /**
     * Получение страницы с Правилами
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $rules = Rule::all();
        $name = __('messages.rules.name');

        return Inertia::render('Admin/AdminRule', compact('name', 'rules'));
    }

    /**
     * Вывод формы для создание правил
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        $name = __('messages.rules.create');

        return Inertia::render('Admin/rule/AdminRuleCreate', compact('name'));
    }

    /**
     * Сохраняем правило
     *
     * @param AgreementRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(RuleCreateRequest $request): JsonResponse
    {
        Rule::create($request->validated());

        return response()->json(['result' => __('messages.success')]);
    }

    /**
     * Вывод формы для редактирования правила
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit(int $id)
    {
        $rules = Rule::findOrFail($id);
        $name = __('messages.rules.update');

        return Inertia::render('Admin/rule/AdminRuleCreate', compact('name','rules'));
    }

    /**
     * Обновление правила
     *
     * @param \App\Http\Requests\Admin\Rule\RuleUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(RuleUpdateRequest $request): JsonResponse
    {
        Rule::findOrFail($request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json(['result' => __('messages.success')]);
    }

    /**
     * Удаляем правило
     *
     * @param \Illuminate\Http\JsonResponse $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IDRequest $request): JsonResponse
    {
        Rule::destroy($request->id);

        return response()->json(['result' => __('messages.success')]);
    }

}
