<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Listeners\CreatedUserProfile;
use App\Models\User;
use App\Repositories\Recaptcha\Recaptcha;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    private $recaptcha;

    public function __construct(Recaptcha $recaptcha)
    {
        $this->recaptcha = $recaptcha;
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        if ($this->recaptcha === '') {
            throw ValidationException::withMessages([
                'recaptcha' => __('errors.recaptha.not_found')
            ]);
        }

        $this->recaptcha->getRecaptcha($request->recaptcha);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new CreatedUserProfile($user));

        Auth::login($user);

        return redirect()->intended();
    }
}
