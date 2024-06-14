<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Services\Public\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected $services;

    /**
     * Получем сервис профиля
     * @param \App\Http\Services\Public\Profile $servies
     */
    public function __construct(Profile $services)
    {
        $this->services = $services;
    }

    /**
     * Редактирование профиля
     *
     * @return \Inertia\Response
     */
    public function edit($id = null): Response
    {
        $userID = is_null($id) ? Auth::user()->id : $id;

        $user = User::with('profile')->find($userID);

        return Inertia::render('Public/Profile/Edit', [
            'user' => $user,
            'profile' => $user->profile,
        ]);
    }

    /**
     * Обновление профиля
     *
     * @param \App\Http\Requests\ProfileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProfileRequest $request): JsonResponse
    {
        return response()->json($this->services->updateProfile((object) $request->validated()));
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
