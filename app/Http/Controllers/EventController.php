<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Requests\StoreEventRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Events/Index', [
            "events" => Event::with('user:id,name')->latest()->get()
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
    
        $request->user()->events()->create($validated);

        return redirect(route('event-upload.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreEventRequest $request, Event $event_upload) : RedirectResponse
    {
        $this->authorize('update', $event_upload);

        $validated = $request->validated();

        $event_upload->update($validated);

        return redirect(route('event-upload.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event_upload): RedirectResponse
    {
        $this->authorize('delete', $event_upload);

        $event_upload->delete();

        return redirect(route('event-upload.index'));
    }
}
