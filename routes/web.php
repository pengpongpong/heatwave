<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SendEmailController;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

use Inertia\Inertia;

use App\Helpers\Helper;
use App\Http\Controllers\CrewController;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Crew;

use Carbon\Carbon;


/**
 * HOME PAGE
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

    return Inertia::render('Page/Landing', [
        'data' => $data,
        'hideNav' => true
    ]);
})->name('home');


/**
 * GALLERY PAGE
 */
Route::get('/galerie', function () {
    $event_list = Event::select('name', 'id')->latest()->get();
    $image_list = Gallery::select('event', 'event_id', 'url')->get();

    $image_list->transform(function ($image) {
        // get event name and remove whitespace
        $event_trimmed = str_replace(' ', '', $image->event);

        // encode image-url for presentation and prepend aws_path
        $image['url'] = Helper::awsPath(str_replace($event_trimmed, rawurlencode($event_trimmed), $image->url));

        return $image;
    });

    return Inertia::render('Page/Gallery', [
        "imageList" => $image_list,
        'eventList' => $event_list,
        'hideNav' => false
    ]);
})->name('gallery');


/**
 * EVENT PAGE
 */
Route::get('/events', function () {
    $events = Event::orderBy('date', 'desc')->get();

    $events->transform(function ($event) {
        $event['date'] = Carbon::parse($event->date)->format('d/m/Y');
        $event['time'] = Carbon::parse($event->time)->format('H:i');
        $event['cover_url'] = Helper::awsPath($event['cover_url']);

        return $event;
    });

    return Inertia::render('Page/Events', [
        'events' => $events
    ]);
})->name('events');


/**
 * ABOUT US PAGE
 */
Route::get('/ueber-uns', function () {
    return Inertia::render('Page/About', []);
})->name('about');


/**
 * CREW PAGE
 */
Route::get('/crew', function () {
    $crew = Crew::orderBy('id')->get();

    $crew->transform(function ($member) {
        $member['image_url'] = Helper::awsPath($member['image_url']);

        return $member;
    });

    return Inertia::render('Page/TheCrew', [
        'crew' => $crew,
    ]);
})->name('theCrew');


/**
 * CONTACT PAGE
 */
Route::get('/kontakt', function () {
    $error = Session::get('error');
    $success = Session::get('success');

    return Inertia::render('Page/Contact', [
        'error' => $error,
        'success' => $success
    ]);
})->name('contact');

// contact form post
Route::post('/kontakt', [SendEmailController::class, 'index'])
    ->name('kontakt');


/**
 * GALLERY UPLOAD
 */
Route::resource('gallery-upload', GalleryController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);


/**
 * EVENT UPLOAD
 */
Route::resource('event-upload', EventController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

// put, patch not working with file uploads -> only post
Route::post('event-upload/{event_upload}', [EventController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('event-upload.update');


/**
 * CREW UPLOAD
 */
Route::resource('crew-upload', CrewController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

// put, patch not working with file uploads -> only post
Route::post('crew-upload/{crew_upload}', [CrewController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('crew-upload.update');


/**
 * DASHBOARD
 */
Route::get('/dashboard', function () {
    return Inertia::render('Page/Dashboard');
})->middleware(['auth', 'verified'])
    ->name('dashboard');


/**
 * PROFILE
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
