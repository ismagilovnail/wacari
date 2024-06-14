<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    /**
     * Получение страницы с пользователями
     *
     * @return Inertia\Response;
     */
    public function index(): Response
    {
        $users = User::with('profile')->get();

        return Inertia::render('Admin/AdminUsers', compact('users'));
    }

    /**
     * Получение страницы пользователя
     *
     * @return Inertia\Response;
     */
    public function edit(int $id): Response
    {
        $user = User::with('profile')->find($id);

        return Inertia::render('Admin/Users/AdminUserEdit', [
            'user' => $user,
            'profile' => $user->profile,
            'id' => $id
        ]);
    }
}
