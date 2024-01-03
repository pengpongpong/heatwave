<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SendEmailController;

use Illuminate\Support\Facades\Session;

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
        '*[_type == "landing"][0]
        {
            "firstLandscape": images.firstLandscape.asset->url,
            "firstPortrait": images.firstPortrait.asset->url,
            "secondLandscape": images.secondLandscape.asset->url,
            "secondPortrait": images.secondPortrait.asset->url,
        }'
    );

    return Inertia::render('Landing', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'data' => $data,
        'hideNav' => true
    ]);
})->name('home');

Route::get('/galerie', function () {

    $sanityClient = app('sanity');

    $data = $sanityClient->fetch(
        '*[_type == "gallery"][0]{"images": images[].asset->url}'
    );

    return Inertia::render('Gallery', [
        'data' => $data,
        'hideNav' => false
    ]);
})->name('gallery');

Route::get('/ueber-uns', function () {
    return Inertia::render('About', []);
})->name('about');

Route::get('/event', function () {
    return Inertia::render('Events', []);
})->name('event');

Route::get('/crew', function () {
    return Inertia::render('TheCrew', []);
})->name('theCrew');

Route::get('/kontakt', function () {

    $error = Session::get('error');
    $success = Session::get('success');

    return Inertia::render('Contact', [
        'error' => $error,
        'success' => $success
    ]);
})->name('contact');

Route::post('/kontakt', [SendEmailController::class, 'index'])->name('kontakt');

Route::resource('gallery-upload', GalleryController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

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
