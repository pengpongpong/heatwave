<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SendEmailController;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

use Inertia\Inertia;

use App\Helpers\Helper;

use App\Models\Event;
use App\Models\Gallery;

use Carbon\Carbon;


/**  HOME **/
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

    return Inertia::render('Pages/Landing', [
        'data' => $data,
        'hideNav' => true
    ]);
})->name('home');


/**  GALLERY **/
Route::get('/galerie', function () {
    $event_list = Event::select('name', 'id')->get();
    $image_list = Gallery::select('event', 'event_id', 'url')->get();

    $image_list->transform(function ($image) {
        // get event name and remove whitespace
        $event_trimmed = str_replace(' ', '', $image->event);

        // encode image-url for presentation and prepend aws_path
        $image['url'] = Helper::awsPath(str_replace($event_trimmed, rawurlencode($event_trimmed), $image->url));

        return $image;
    });

    return Inertia::render('Pages/Gallery', [
        "imageList" => $image_list,
        'eventList' => $event_list,
        'hideNav' => false
    ]);
})->name('gallery');


/** EVENTS **/
Route::get('/events', function () {
    $events = Event::orderBy('date', 'desc')->get();

    $events->transform(function ($event) {
        $event['date'] = Carbon::parse($event->date)->format('d/m/Y');
        $event['time'] = Carbon::parse($event->time)->format('H:i');
        $event['cover_url'] = Helper::awsPath($event['cover_url']);

        return $event;
    });

    return Inertia::render('Pages/Events', [
        'events' => $events
    ]);
})->name('events');


/**  ABOUT US **/
Route::get('/ueber-uns', function () {
    return Inertia::render('Pages/About', []);
})->name('about');


/** THE CREW **/
Route::get('/crew', function () {
    return Inertia::render('Pages/TheCrew', []);
})->name('theCrew');


/** CONTACT **/
Route::get('/kontakt', function () {
    $error = Session::get('error');
    $success = Session::get('success');

    return Inertia::render('Pages/Contact', [
        'error' => $error,
        'success' => $success
    ]);
})->name('contact');

/** CONTACT FORM **/
Route::post('/kontakt', [SendEmailController::class, 'index'])
    ->name('kontakt');


/** GALLERY UPLOAD **/
Route::resource('gallery-upload', GalleryController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);


/** EVENT UPLOAD **/
Route::resource('event-upload', EventController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

// put, patch not working with file uploads -> only post
Route::post('event-upload/{event_upload}', [EventController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('event-upload.update');


/** DASHBOARD **/
Route::get('/dashboard', function () {
    return Inertia::render('Pages/Dashboard');
})->middleware(['auth', 'verified'])
    ->name('dashboard');


/** PROFILE **/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
