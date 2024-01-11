<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SitemapControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_sitemap(): void
    {
        // Perform the request to the SitemapController
        $response = $this->get(route('sitemap'));

        // Assert a successful response
        $response->assertStatus(200);

        // Assert the correct Content-Type header
        $response->assertHeader('Content-Type', 'application/xml');

        // Expected URLs in the sitemap
        $expectedUrls = [
            'https//heatwave.at/',
            'https//heatwave.at/galerie',
            'https//heatwave.at/events',
            'https//heatwave.at/crew',
            'https//heatwave.at/ueber-uns',
            'https//heatwave.at/kontakt',
        ];

        // Assert the presence of each URL in the response
        foreach ($expectedUrls as $url) {
            $response->assertSee($url);
            $response->assertSee('urlset xmlns');
            $response->assertSee('url');
            $response->assertSee('loc');
            $response->assertSee('lastmod');
            $response->assertSee('sitemap');
        }
    }
}
