<?php

use App\Http\Controllers\BiographyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('navigate', [NavigationController::class, 'getNavigate']);

Route::middleware('auth')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('edit/{id?}', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('update', [ProfileController::class, 'update'])->name('profile.update');
    });

    Route::prefix('biography')->group(function () {
        Route::get('create', [BiographyController::class, 'create'])->name('biography.create');
    });
});

require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
