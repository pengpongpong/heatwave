<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Sanity\Client as SanityClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('sanity', function ($app) {
            return new SanityClient([
                'projectId' => config('app.sanity_project_id'),
                'dataset' => config('app.sanity_dataset'),
                'apiVersion' => config('app.sanity_api'),
                'useCdn' => true
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
