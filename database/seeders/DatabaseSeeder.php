<?php

namespace Database\Seeders;

use App\Models\Quizbank;
use App\Models\Quizquestions;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		// User::factory(10)->create();

		// Calling the NFLATCategorySeeder
		$this->call(NFLATCategorySeeder::class);

		// calling School Seeder
		$this->call(SchoolSeeder::class);

		// calling general Settings seeder
		$this->call(generalSettingSeeder::class);

		// User::factory()->create([
		//     'name' => 'Test User',
		//     'email' => 'test@example.com',
		// ]);

		Quizbank::factory()->count(2)->create();
		Quizquestions::factory()->count(200)->create();
	}
}
