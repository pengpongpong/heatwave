<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\User;
use App\Models\Crew;

class CrewControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_authorized()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Perform the request to the controller action
        $response = $this->get(route('crew-upload.index'));

        $this->assertAuthenticated();

        // View correct page
        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Upload/CrewUpload';
            });
    }

    public function test_index_unauthorized()
    {
        $this->assertGuest();

        // Perform the request to the controller action
        $response = $this->get(route('crew-upload.index'));

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
        $file = UploadedFile::fake()->image('avatar.webp');

        $test_data = [
            'title' => 'Crew Title',
            'email' => 'crew@test.com'
        ];

        // Perform the request to the controller action with form data
        $response = $this->post(route('crew-upload.store'), [
            'type' => 'store',
            'title' => $test_data['title'],
            'instagram' => 'instagram_handle',
            'website' => 'http://example.com',
            'email' => $test_data['email'],
            'image_url' => $file,
            'description' => 'Crew Description',
        ]);

        // Assert that the crew member was created in the database
        $this->assertDatabaseHas('crews', [
            'title' => $test_data['title'],
            'email' => $test_data['email'],
        ]);

        // Assert that the image file was stored in the expected directory in S3
        $this->assertTrue(
            Storage::disk('s3_testing')->exists('crew/' . $file->hashName()),
            'The file was not found on the S3 disk.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('crew-upload.index'));
    }

    public function test_update()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake crew member
        $crewMember = Crew::factory()->create([
            'title' => 'Original Crew Title',
            'email' => 'original@example.com',
            'user_id' => $user->id,
        ]);

        // Create a fake image file
        $file = UploadedFile::fake()->image('updated_avatar.webp');

        $test_data = [
            'title' => 'Updated Crew Title',
            'email' => 'update_crew@test.com'
        ];

        // Perform the request to the controller action with form data for update
        $response = $this->post(route('crew-upload.update', $crewMember), [
            'type' => 'update',
            'title' => $test_data['title'],
            'instagram' => 'updated_instagram_handle',
            'website' => 'http://updated-example.com',
            'email' => $test_data['email'],
            'image_url' => $file,
            'description' => 'Updated Crew Description',
        ]);

        // Assert that the crew member was updated in the database
        $this->assertDatabaseHas('crews', [
            'id' => $crewMember->id,
            'title' => $test_data['title'],
            'email' => $test_data['email'],
        ]);

        // Assert that the original image file is deleted from storage
        $this->assertFalse(
            Storage::disk('s3_testing')->exists('crew/' . $crewMember->image_url),
            'The original file was not deleted from the S3 disk.'
        );

        // Assert that the new image file was stored in the expected directory in S3
        $this->assertTrue(
            Storage::disk('s3_testing')->exists('crew/' . $file->hashName()),
            'The new file was not found on the S3 disk.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('crew-upload.index'));
    }

    public function test_destroy()
    {
        // Create user
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a fake crew member
        $crewMember = Crew::factory()->create(['user_id' => $user->id]);

        // Perform the request to the controller action
        $response = $this->delete(route('crew-upload.destroy', $crewMember));

        // Assert that the crew member was deleted from the database
        $this->assertDatabaseMissing('crews', ['id' => $crewMember->id]);

        // Assert that the image file was deleted from the S3 disk
        $this->assertFalse(
            Storage::disk('s3_testing')->exists('crew/' . $crewMember->image_url),
            'The file was found on the S3 disk after deletion.'
        );

        // Assert that the response redirects to the expected route
        $response->assertRedirect(route('crew-upload.index'));
    }
}
