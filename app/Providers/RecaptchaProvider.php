<?php

namespace App\Providers;

use App\Repositories\Interfaces\iRecaptcha;
use App\Repositories\Recaptcha\Recaptcha;
use Illuminate\Support\ServiceProvider;

class RecaptchaProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            iRecaptcha::class,
            Recaptcha::class
        );

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
