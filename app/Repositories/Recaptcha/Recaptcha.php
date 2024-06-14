<?php

namespace  App\Repositories\Recaptcha;

use App\Repositories\Interfaces\iRecaptcha;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class Recaptcha implements iRecaptcha
{
    /**
     * Проверка на капчу
     *
     * @param string $recaptcha
     * @return void
     */
    public function getRecaptcha(string $recaptcha): void
    {
        $secret = config('recaptcha.api_secret_key');

        $response = Http::post("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$recaptcha}");

        if (!$response->object()->success) {
            throw ValidationException::withMessages([
                'recaptcha' => __('errors.recaptha.error')
            ]);
        }
    }
}
