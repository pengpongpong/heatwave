<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class GalleryControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_index_authorized()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Perform the request to the controller action
        $response = $this->get(route('gallery-upload.index'));

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Upload/GalleryUpload';
            });
    }

    public function test_index_unauthorized()
    {
        $this->assertGuest();

        // Perform the request to the controller action
        $response = $this->get(route('gallery-upload.index'));

        $response->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    public function test_store()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake event
        $event = Event::factory()->create(['user_id' => $user->id]);

        // Create multiple fake images
        $files = [
            UploadedFile::fake()->image('image1.webp'),
            UploadedFile::fake()->image('image2.webp'),
        ];

        // Perform the request to the controller action with form data
        $response = $this->post(route('gallery-upload.store'), [
            'user_id' => $user->id,
            'event' => $event->name,
            'eventId' => $event->id,
            'images' => [
                $files[0],
                $files[1]
            ],
        ]);

        // remove whitespace
        $event_trimmed = str_replace(' ', '', $event['name']);

        // Assert that the images were saved to the disk
        foreach ($files as $file) {
            $filePath = $event_trimmed . '/' . $file->hashName();

            $this->assertTrue(
                Storage::disk('s3_testing')->exists($filePath),
                'The file was not found on the disk.'
            );

            // Assert that the images were saved to the database
            $this->assertDatabaseHas('galleries', [
                'user_id' => $user->id,
                'event' => $event->name,
                'event_id' => $event->id,
                'url' => $filePath
            ]);
        }

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('gallery-upload.index'));
    }

    public function test_delete()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake gallery
        $gallery = Gallery::factory()->create(['user_id' => $user->id]);

        // Perform the request to the controller action to delete gallery
        $response = $this->delete(route('gallery-upload.destroy', $gallery));

        // Assert that the event was deleted from the database
        $this->assertDatabaseMissing('galleries', ['id' => $gallery->id]);

        // Assert that the file associated with the event was deleted from storage
        $this->assertFalse(
            Storage::disk('s3_testing')->exists($gallery->url)
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('gallery-upload.index'));
    }
}
