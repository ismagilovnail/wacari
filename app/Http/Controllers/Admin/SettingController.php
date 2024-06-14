<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\AgreementRequest;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Получаем настройку сайта
     *
     * @param string $chapter
     * @return \Intertia\Response
     */
    public function index(string $chapter): Response
    {
        $setting = Setting::where('chapter', $chapter)->get();


        return Inertia::render('Admin/AdminAgreement', [
            'name' => __('messages.agreement'),
            'setting' => $setting,
            'chapter' => $chapter,
        ]);
    }


    /**
     * Сохраняем настройку
     *
     * @param AgreementRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AgreementRequest $request): JsonResponse
    {
        $setting = Setting::updateOrCreate(['chapter' => $request->chapter], ['text' => $request->text]);

        return response()->json(['result' => __('messages.success')]);
    }
}
