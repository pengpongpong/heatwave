<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cookie_analytics = isset($_COOKIE['consent-analytics']) ? $_COOKIE['consent-analytics'] : false;
        $cookie_advertise = isset($_COOKIE['consent-advertise']) ? $_COOKIE['consent-analytics'] : false;

        $consent = [
            'analytics' => $cookie_analytics,
            'advertise' => $cookie_advertise
        ];

        $gtag_id = config('app.gtag_id');

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'consent' => $consent,
            'gtag' => $gtag_id,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
