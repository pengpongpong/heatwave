<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
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
        $events = Event::with('user:id,name')->orderBy('date', 'desc')->get();

        $events->transform(function ($event) {
            $event['cover_url'] = Helper::awsPath($event['cover_url']);

            return $event;
        });

        return Inertia::render('Upload/EventUpload', [
            "events" => $events
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request): RedirectResponse
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
    public function update(StoreEventRequest $request, Event $event_upload): RedirectResponse
    {
        $this->authorize('update', $event_upload);

        $validated = $request->validated();

        $event = Event::where('id', $event_upload['id'])->get();

        // update storage
        Helper::updateStorage($validated, 'cover_url', $event[0]->cover_url, 'events/cover');

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
