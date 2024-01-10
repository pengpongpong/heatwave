<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class EventControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;
 
    public function test_index_authorized()
    {
       // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Perform the request to the controller action
        $response = $this->get(route('event-upload.index'));

        // Assert that the response loads EventUpload component
        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Upload/EventUpload';
            });
    }

    public function test_index_unauthorized()
    {
        $this->assertGuest();

        // Perform the request to the controller action
        $response = $this->get(route('event-upload.index'));

        // Assert that the response redirect to login
        $response->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    public function test_store()
    {
       // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake image file
        $file = UploadedFile::fake()->image('cover_image.webp');

        // Perform the request to the controller action with form data
        $response = $this->post(route('event-upload.store'), [
            'type' => 'store',
            'name' => 'Event Name',
            'date' => now()->format('Y-m-d'),
            'time' => now()->format('H:i:s'),
            'location' => 'Event Location',
            'artist' => 'Event Artist',
            'cover_url' => $file,
            'description' => 'Event Description',
        ]);

        // Assert that the event was created in the database
        $this->assertDatabaseHas('events', [
            'name' => 'Event Name',
            'user_id' => $user->id,
        ]);

        // Assert that the image file was stored in the expected directory in storage
        $this->assertTrue(
            Storage::disk('s3_testing')->exists('events/cover/' . $file->hashName()),
            'The file was not found in the storage directory.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('event-upload.index'));
    }

    public function test_update()
    {
       // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake event
        $event = Event::factory()->create(['user_id' => $user->id]);

        // Create a fake updated image file 
        $updatedFile = UploadedFile::fake()->image('updated_cover_image.webp');

        // Perform the request to the controller action with form data
        $response = $this->post(route('event-upload.update', $event), [
            'type' => 'update',
            'name' => 'Updated Event Name',
            'date' => now()->format('Y-m-d'),
            'time' => now()->format('H:i:s'),
            'location' => 'Updated Event Location',
            'artist' => 'Updated Event Artist',
            'cover_url' => $updatedFile,
            'description' => 'Updated Event Description',
        ]);

        // Assert that the event was updated in the database
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'Updated Event Name',
        ]);

        // Assert that the updated image file was stored in the expected directory in storage
        $this->assertTrue(
            Storage::disk('s3_testing')->exists('events/cover/' . $updatedFile->hashName()),
            'The updated file was not found in the storage directory.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('event-upload.index'));
    }

    public function test_destroy()
    {
       // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake event
        $event = Event::factory()->create(['user_id' => $user->id]);

        // Perform the request to the controller action to delete the event
        $response = $this->delete(route('event-upload.destroy', $event));

        // Assert that the event was deleted from the database
        $this->assertDatabaseMissing('events', ['id' => $event->id]);

        // Assert that the file associated with the event was deleted from storage
        $this->assertFalse(
            Storage::disk('s3_testing')->exists('events/cover/' . $event->cover_url),
            'The file associated with the event was not deleted from storage.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('event-upload.index'));
    }
}
