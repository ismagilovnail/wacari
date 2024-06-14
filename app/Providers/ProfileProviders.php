<?php

namespace App\Providers;

use App\Services\Public\interface\iProfile;
use App\Services\Public\Profile;
use Illuminate\Support\ServiceProvider;

class ProfileProviders extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            iProfile::class,
            Profile::class
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
