<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;

use App\Models\Image;
use Illuminate\Http\RedirectResponse;

class ImageController extends Controller
{
    public function index()
    {

        $directories = Storage::directories();
        $files_url = [];
        foreach ($directories as $directory) {
            $file = Storage::allFiles($directory);

            $files_url[$directory] = $file;
        }
        // dd($files_url);
        // dd($directories);

        // get all directories and list
        // inside list, show all urls
        // add delete option 
        // add edit option


        $error = Session::get('error');
        return Inertia::render('Events/EventImage', [
            'error' => $error,
            "events" => $directories,
            "imageList" => $files_url,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'event' => 'required|string',
            'image' => 'required|image|mimes:webp|max:2048'
        ]);
        // dd($request->image);


        $path = Storage::put($validated['event'], $validated['image']);

        if (!$path) {
            return redirect(route('upload'))->with('error', 'Could not save image to disk');
        }

        $validated['path'] = $path;

        $request->user()->images()->create($validated);

        return redirect(route('upload'));
    }

    public function destroy(Image $image): RedirectResponse
    {
        $this->authorize('delete', $image);

        dd($image);

        return redirect(route('upload'));
    }
}
