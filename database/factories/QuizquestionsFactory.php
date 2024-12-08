<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class QuizquestionsFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'quizbank_id' => fake()->randomElement(['1', '2', '3']),
			'category' => fake()->randomElement(['Banking', 'Investment', 'Insurance', 'Pension', 'General']),
			'question' => fake()->sentence(15),
			'A' => fake()->word(),
			'B' => fake()->word(),
			'C' => fake()->word(),
			'D' => fake()->word(),
			'correct_answer' => fake()->randomElement(['A', 'B', 'C', 'D']),
		];
	}
}
