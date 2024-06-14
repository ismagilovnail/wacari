<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ContinentsController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\ReligionsController;
use App\Http\Controllers\Admin\RuleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TipsController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Middleware\RoleUser;
use App\Models\Country;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', RoleUser::class])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::get('video-about/{chapter}', [VideoController::class, 'index'])->name('dashboard.video.index');
        Route::post('video-about', [VideoController::class, 'store'])->name('dashboard.video.store');
        Route::patch('video-about', [VideoController::class, 'update'])->name('dashboard.video.update');
        Route::post('video-delete', [VideoController::class, 'destroy'])->name('dashboard.video.destroy');

        Route::get('agreement/{chapter}', [SettingController::class, 'index'])->name('setting.index');
        Route::post('agreement', [SettingController::class, 'store'])->name('setting.store');

        Route::get('religions', [ReligionsController::class, 'index'])->name('religion.index');
        Route::post('religions', [ReligionsController::class, 'store'])->name('religion.store');
        Route::patch('religions', [ReligionsController::class, 'update'])->name('religion.update');
        Route::post('religions-delete', [ReligionsController::class, 'destroy'])->name('religion.destroy');

        Route::get('tips', [TipsController::class, 'index'])->name('tips.index');
        Route::post('tips', [TipsController::class, 'store'])->name('tips.store');
        Route::patch('tips', [TipsController::class, 'update'])->name('tips.update');
        Route::post('tips-delete', [TipsController::class, 'destroy'])->name('tips.destroy');

        Route::get('about', [AboutController::class, 'index'])->name('about.index');
        Route::post('about', [AboutController::class, 'store'])->name('about.store');

        Route::get('users', [AdminUserController::class, 'index'])->name('user.index');
        Route::get('users/{id?}', [AdminUserController::class, 'edit'])->name('user.edit');

        Route::get('rules', [RuleController::class, 'index'])->name('rule.index');
        Route::get('rules/create', [RuleController::class, 'create'])->name('rule.create');
        Route::post('rules', [RuleController::class, 'store'])->name('rule.store');
        Route::get('rules/{id}', [RuleController::class, 'edit'])->name('rule.edit');
        Route::patch('rules', [RuleController::class, 'update'])->name('rule.update');
        Route::post('rules-delete', [RuleController::class, 'destroy'])->name('rule.destroy');

        Route::get('continents', [ContinentsController::class, 'index'])->name('continents.index');
        Route::post('continents', [ContinentsController::class, 'store'])->name('continents.store');
        Route::patch('continents', [ContinentsController::class, 'update'])->name('continents.update');
        Route::post('continents-delete', [ContinentsController::class, 'destroy'])->name('continents.destroy');

        Route::get('country', [CountryController::class, 'index'])->name('country.index');
        Route::post('country', [CountryController::class, 'store'])->name('country.store');
        Route::patch('country', [CountryController::class, 'update'])->name('country.update');
        Route::post('country-delete', [CountryController::class, 'destroy'])->name('country.destroy');
    });
});
