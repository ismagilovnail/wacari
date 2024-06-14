<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\IDRequest;
use App\Http\Requests\Video\VideoRequest;
use App\Http\Requests\Video\VideoUpdateRequest;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Поулчение страницы Видео
     *
     * @param string $chapter
     * @return Inertia\Response
     */
    public function index(string $chapter): Response
    {
        $videos = Video::select('id', 'link')->where('chapter', $chapter)->oldest()->get();
        $name = __('messages.videoAbout');

        if ($chapter === 'instructions') {
            $name = __('messages.videoInstructions');
        }


        return Inertia::render('Admin/AdminVideo', compact('name', 'videos', 'chapter'));
    }

    /**
     * Создание Ссылки для Видео
     *
     * @param \App\Http\Requests\Video\VideoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(VideoRequest $request): JsonResponse
    {
        $video = Video::create($request->validated());

        return response()->json(['result' => __('messages.success'), 'id' => $video->id]);
    }

    /**
     * Обновление Ссылки для Видео
     *
     * @param \App\Http\Requests\Video\VideoUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(VideoUpdateRequest $request): JsonResponse
    {
        $video = Video::findOrFail($request->id);
        $video->link = $request->link;
        $video->save();

        return response()->json(['result' => __('messages.success')]);
    }

    /**
     * Удаление Ссылки для Видео
     *
     * @param \App\Http\Requests\IDReques $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(IDRequest $request)
    {
        $video = Video::findOrFail($request->id);
        $video->delete();

        return response()->json(['result' => __('messages.success')]);
    }
}
