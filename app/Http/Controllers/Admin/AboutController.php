<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\About\AboutRequest;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Получение страницы о нас
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $setting = Setting::where('chapter', 'about')->get();
        $name = __('messages.about');
        $chapter = 'about';

        return Inertia::render('Admin/AdminAbout', compact('name','setting', 'chapter'));
    }

    public function store(AboutRequest $request): JsonResponse
    {
        Setting::updateOrCreate(['chapter' => $request->chapter], [
            'text' => $request->text,
            'text_two' => $request->text_two,
        ]);

        return response()->json(['result' => __('messages.success')]);
    }
}
