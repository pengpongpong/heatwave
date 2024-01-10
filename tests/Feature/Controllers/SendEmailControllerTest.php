<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SendEmailControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    
    public function test_contact_page(): void
    {
        $response = $this->get('/kontakt');

        $response->assertStatus(200);
    }

    public function test_contact_form_success()
    {
        $response = $this->post('/kontakt', [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'message' => $this->faker->paragraph,
        ]);

        $response->assertRedirect(route('contact'))
            ->assertSessionHas('success', 'Nachricht erfolgreich gesendet');
    }

    public function test_contact_form_rate_limit_exceeded()
    {
        // Simulate rate limiting by sending more requests than allowed in a short time
        for ($i = 0; $i < 5; $i++) {
            $this->post('/kontakt', [
                'name' => $this->faker->name,
                'email' => $this->faker->email,
                'message' => $this->faker->paragraph,
            ]);
        }

        $response = $this->post('/kontakt', [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'message' => $this->faker->paragraph,
        ]);

        $response->assertRedirect(route('contact'))
            ->assertSessionHas('error', 'Zu viele gesendete Nachrichten!');
    }
}
