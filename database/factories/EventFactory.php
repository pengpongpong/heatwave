<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Models\Event;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->sentence,
            'date' => $this->faker->date,
            'time' => $this->faker->time,
            'location' => $this->faker->sentence,
            'artist' => $this->faker->name,
            'cover_url' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph,
        ];
    }
}
