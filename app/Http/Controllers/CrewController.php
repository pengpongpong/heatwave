<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\StoreCrewRequest;
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
        $crew = Crew::with('user:id,name')->latest()->get();

        $crew->transform(function ($member) {
            $member['image_url'] = Helper::awsPath($member['image_url']);

            return $member;
        });

        return Inertia::render('Upload/CrewUpload', [
            'crew' => $crew,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCrewRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $path = Storage::put('crew', $validated['image_url']);
        $validated['image_url'] = $path;

        $request->user()->crew()->create($validated);

        return redirect(route('crew-upload.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCrewRequest $request, Crew $crew_upload): RedirectResponse
    {
        $this->authorize('update', $crew_upload);

        $validated = $request->validated();

        $crew = Crew::where('id', $crew_upload['id'])->get();
       
        // update storage
        Helper::updateStorage($validated, 'image_url', $crew[0]->image_url, 'crew');

        $crew_upload->update($validated);

        return redirect(route('crew-upload.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crew $crew_upload): RedirectResponse
    {
        $this->authorize('delete', $crew_upload);

        Storage::delete($crew_upload->image_url);

        $crew_upload->delete();

        return redirect(route('crew-upload.index'));
    }
}
