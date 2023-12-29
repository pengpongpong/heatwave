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
    
        $request->user()->event()->create($validated);

        return redirect(route('events.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event) : RedirectResponse
    {

        $this->authorize('update', $event);

        $validated = $request->validate([
            'description' => 'required|string'
        ]);

        $event->update($validated);

        return redirect(route('events.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event): RedirectResponse
    {
        $this->authorize('delete', $event);

        $event->delete();

        return redirect(route('events.index'));
    }
}
