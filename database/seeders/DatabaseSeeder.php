<?php

namespace Database\Seeders;

use App\Models\Admin;
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
		// $this->call(NFLATCategorySeeder::class);

		// // calling School Seeder
		// $this->call(SchoolSeeder::class);

		// // calling general Settings seeder
		// $this->call(generalSettingSeeder::class);

		// Create Admin records manually
Admin::create([
    'username' => 'Sanjeev',
    'email' => 'sanjeev.shinde@ncfe.org.in',
    'password' => 'Shrisha@000010', // Hash the password for security
]);

Admin::create([
    'username' => 'Roshan',
    'email' => 'itexecutive02@ncfe.org.in',
    'password' => 'Shrisha@000040',
]);

Admin::create([
    'username' => 'Ruchi',
    'email' => 'ruchi.thakur@ncfe.org.in',
    'password' => 'Shrisha@000030',
]);

Admin::create([
    'username' => 'Prathap',
    'email' => 'prathap.hn@ncfe.org.in',
    'password' => 'Shrisha@000020',
]);

		// Quizbank::factory()->count(3)->create();
		// Quizquestions::factory()->count(500)->create();
	}
}
