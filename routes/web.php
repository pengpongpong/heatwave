<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SendEmailController;

use Illuminate\Support\Facades\Session;

use App\Models\Event;
use App\Models\Gallery;

use Carbon\Carbon;

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

    $data['videoUrl'] = "";

    return Inertia::render('Landing', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'data' => $data,
        'hideNav' => true
    ]);
})->name('home');

Route::get('/galerie', function () {
    $event_list = Event::select('name', 'id')->get();
    $image_list = Gallery::select('event', 'event_id', 'url')->get();

    $aws_path = 'https://' . config('app.aws_bucket') . '.s3.' . config('app.aws_region') . '.amazonaws.com/';

    // encode image-url for presentation and prepend aws_path
    foreach ($image_list as $image) {
        $event_trimmed = str_replace(' ', '', $image->event);
        $image['url'] = $aws_path . str_replace($event_trimmed, rawurlencode($event_trimmed), $image->url);
    };

    return Inertia::render('Gallery', [
        // 'data' => $data,
        "imageList" => $image_list,
        'eventList' => $event_list,
        'hideNav' => false
    ]);
})->name('gallery');

Route::get('/ueber-uns', function () {
    return Inertia::render('About', []);
})->name('about');

Route::get('/events', function () {
    $events = Event::orderBy('date', 'desc')->get();

    $events->transform(function ($event) {
        $aws_path = 'https://' . config('app.aws_bucket') . '.s3.' . config('app.aws_region') . '.amazonaws.com/';

        $event->date = Carbon::parse($event->date)->format('d/m/Y');
        $event->time = Carbon::parse($event->time)->format('H:i');
        $event->cover_url = $aws_path . $event['cover_url'];

        return $event;
    });

    return Inertia::render('Events', [
        'events' => $events
    ]);
})->name('events');

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

Route::resource('event-upload', EventController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

// put, patch not working with file uploads -> only post
Route::post('event-upload/{event_upload}', [EventController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('event-upload.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
