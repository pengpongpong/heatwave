<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $sanityClient = app('sanity');

    $data = $sanityClient->fetch(
        '*[_type == "landing"][0]'
    );

    $sanityConfig = [
        'projectId' => config('app.sanity_project_id'),
        'dataset' => config('app.sanity_dataset'),
    ];

    return Inertia::render('Landing', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'sanityConfig' => $sanityConfig,
        'data' => $data,
        'hideNav' => true
    ]);
})->name('home');

Route::get('/gallery', function () {

    $sanityClient = app('sanity');

    $data = $sanityClient->fetch(
        '*[_type == "gallery"][0]{"images": images[].asset->url}'
    );

    return Inertia::render('Gallery', [
        'data' => $data,
        'hideNav' => false
    ]);
})->name('gallery');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('events', EventController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
