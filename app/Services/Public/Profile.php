<?php

namespace App\Services\Public;

use App\Models\User;
use App\Services\Public\interface\iProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class Profile implements iProfile
{
    /**
     * Обновление профиля пользователя
     * @param object $request
     * @return array
     */
    public function updateProfile(object $request): array
    {
        $user = User::find($request->id);
        $profile = $user->profile();

        if ($request->avatar) {
            $userAvatar = $profile->first('avatar')->avatar;

            if (!is_null($userAvatar)) {
                Storage::delete($userAvatar);
            }

            $avatar =  Storage::putFile('public', $request->avatar);
            $profile->update(['avatar' => Storage::url($avatar)]);
        }

        if (!is_null($request->password)) {
            $user->update(['password', Hash::make($request->password)]);
        }

        $user->update(['email' => $request->email]);


        $profile->update([
            'name' => $request->name,
            'surname' => $request->surname,
            'patronymic' => $request->patronymic,
            'phone' => $request->phone,
            'birth' => $request->birth,
            'mailing_address' => $request->mailing_address,
            'notes' => $request->notes,
        ]);

        return [
            'success' => true,
            'severity' => 'success',
            'title' => __('messages.success'),
            'desc' => __('messages.alert.profile'),
        ];
    }
}
