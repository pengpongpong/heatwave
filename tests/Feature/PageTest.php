<?php

namespace Tests\Feature;

use Tests\TestCase;

class PageTest extends TestCase
{
    public function test_landing_page_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/Landing';
            });
    }

    public function test_gallery_page_returns_a_successful_response(): void
    {
        $response = $this->get('/galerie');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/Gallery';
            });
    }
    public function test_events_page_returns_a_successful_response(): void
    {
        $response = $this->get('/events');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/Events';
            });
    }
    public function test_about_us_page_returns_a_successful_response(): void
    {
        $response = $this->get('/ueber-uns');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/About';
            });
    }
    public function test_crew_page_returns_a_successful_response(): void
    {
        $response = $this->get('/crew');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/TheCrew';
            });
    }
    public function test_contact_page_returns_a_successful_response(): void
    {
        $response = $this->get('/kontakt');

        $response->assertStatus(200)
            ->assertViewHas('page', function ($data) {
                return $data['component'] === 'Page/Contact';
            });
    }
}
