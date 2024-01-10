<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $event = Event::factory()->create();

        return [
            'user_id' => User::factory(),
            'event' => str_replace(' ', '', $event->name),
            'event_id' => $event->id,
            'url' => $this->faker->imageUrl(),
        ];
    }
}
