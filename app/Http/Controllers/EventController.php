<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Requests\StoreEventRequest;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $aws_path = 'https://' . config('app.aws_bucket') . '.s3.' . config('app.aws_region') . '.amazonaws.com/';
        $events = Event::with('user:id,name')->orderBy('date', 'desc')->get();

        foreach ($events as $event) {
            $event['cover_url'] = $aws_path . $event['cover_url'];
        };

        return Inertia::render('Events/Index', [
            "events" => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();

        $path = Storage::put('events/cover', $validated['cover_url']);
        $validated['cover_url'] = $path;

        $request->user()->events()->create($validated);

        return redirect(route('event-upload.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event_upload)
    {
        $this->authorize('update', $event_upload);

        $validated = $request->validate([
            'name' => 'required|string|max:256',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string|max:256',
            'artist' => 'required|string|max:256',
            'cover_url' => 'nullable|mimes:webp|max:2048',
            'description' => 'required|string',
        ]);

        $event = Event::where('id', $event_upload['id'])->get();
        $cover_url_old = $event[0]->cover_url;

        if (isset($validated['cover_url'])) {
            Storage::delete($cover_url_old);

            $path = Storage::put('events/cover', $validated['cover_url']);
            $validated['cover_url'] = $path;
        } else {
            $validated['cover_url'] = $cover_url_old;
        }

        $event_upload->update($validated);
        return redirect(route('event-upload.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event_upload): RedirectResponse
    {
        $this->authorize('delete', $event_upload);

        Storage::delete($event_upload->cover_url);

        $event_upload->delete();

        return redirect(route('event-upload.index'));
    }
}
