<?php

namespace App\Http\Controllers;

use App\Models\Crew;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;
use Inertia\Response;

class CrewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Upload/CrewUpload', []);
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'instagram' => 'required|string',
            'website' => 'required|string',
            'email' => 'required|email',
            'image_url' => 'required|mimes:webp|max:2048',
            'description' => 'required|string'
        ]);


        $path = Storage::put('crew', $validated['image_url']);
        $validated['image_url'] = $path;

        $request->user()->crew()->create($validated);

        return redirect(route('crew-upload.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Crew $crew)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crew $crew)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Crew $crew)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crew $crew)
    {
        //
    }
}
