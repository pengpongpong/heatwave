<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Gallery;
use App\Models\Event;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;


class GalleryController extends Controller
{
    public function index()
    {
        // get events from database for input selection and image urls
        $event_list = Event::select('name', 'id')->get();
        $image_list = Gallery::with('user:id,name')->select('event', 'url', 'id', 'user_id')->get();
        $error = Session::get('error');

        // encode image-url for presentation and prepend aws_path
        $image_list->transform(function ($image) {
            $event_trimmed = str_replace(' ', '', $image->event);
            $image['url'] = Helper::awsPath(str_replace($event_trimmed, rawurlencode($event_trimmed), $image->url));

            return $image;
        });

        return Inertia::render('Upload/GalleryUpload', [
            "imageList" => $image_list,
            'eventList' => $event_list,
            'error' => $error
        ]);
    }


    // store images
    public function store(Request $request): RedirectResponse
    {
        $dataToInsert = [];

        $validated = $request->validate([
            'event' => 'required|string',
            'eventId' => 'required|integer',
            'images' => 'required',
            'images.*' => 'mimes:webp|max:2048'
        ]);

        // remove whitespace
        $event_trimmed = str_replace(' ', '', $validated['event']);

        // save all files to disk
        foreach ($validated['images'] as $file) {
            $path = Storage::put($event_trimmed, $file);
            
            if (! $path) {
                return redirect(route('gallery-upload.index'))->with('error', 'Could not save image to disk');
            }

            // prepare data for database
            $dataToInsert[] = [
                'user_id' => auth()->id(),
                'event' => $validated['event'],
                'event_id' => $validated['eventId'],
                'url' => $path,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // save to database
        $request->user()->gallery()->insert($dataToInsert);

        return redirect(route('gallery-upload.index'));
    }


    // delete images
    public function destroy(Gallery $gallery_upload): RedirectResponse
    {
        $this->authorize('delete', $gallery_upload);

        Storage::delete($gallery_upload->url);

        $gallery_upload->delete();

        return redirect(route('gallery-upload.index'));
    }
}
