<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Carbon;

class SitemapController extends Controller
{
    public function index()
    {
        $sitemap = $this->generateSitemap();

        return Response::make($sitemap, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }

    // Generate sitemap
    private function generateSitemap()
    {
        $urls = [
            [
                'loc' => 'https//heatwave.at/',
                'lastmod' => $this->getLastModifiedDate()
            ],
            [
                'loc' => 'https//heatwave.at/galerie',
                'lastmod' => $this->getLastModifiedDate()
            ],
            [
                'loc' => 'https//heatwave.at/events',
                'lastmod' => $this->getLastModifiedDate()
            ],
            [
                'loc' => 'https//heatwave.at/crew',
                'lastmod' => $this->getLastModifiedDate()
            ],
            [
                'loc' => 'https//heatwave.at/ueber-uns',
                'lastmod' => $this->getLastModifiedDate()
            ],
            [
                'loc' => 'https//heatwave.at/kontakt',
                'lastmod' => $this->getLastModifiedDate()
            ],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . $url['loc'] . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return $xml;
    }

    // Get current time
    private function getLastModifiedDate()
    {
        return Carbon::now()->toW3cString();
    }
}
