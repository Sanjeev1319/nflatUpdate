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
			'quizbank_id' => fake()->randomElement(['1', '2']),
			'category' => fake()->randomElement(['Banking', 'Investment', 'Insurance', 'Pension']),
			'question' => fake()->sentence(10),
			'option_a' => fake()->word(),
			'option_b' => fake()->word(),
			'option_c' => fake()->word(),
			'option_d' => fake()->word(),
			'correct_answer' => fake()->randomElement(['a', 'b', 'c', 'd']),
		];
	}
}
