<?php

namespace App\Services\Public\interface;

use App\Http\Requests\ProfileRequest;

interface iProfile
{
    /**
     * Обновления профиля
     * @param object $request
     * @return mixed
     */
    public function updateProfile(object $request);
}
