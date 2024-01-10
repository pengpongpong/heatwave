<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Crew>
 */
class CrewFactory extends Factory
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
            'title' => $this->faker->word,
            'instagram' => $this->faker->userName,
            'website' => $this->faker->url,
            'email' => $this->faker->unique()->safeEmail,
            'image_url' => $this->faker->imageUrl(format: 'png'),
            'description' => $this->faker->paragraph,
        ];
    }
}
