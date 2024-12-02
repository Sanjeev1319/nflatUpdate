<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class generalSettingSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Inserting data into the NFLATCategory table
		DB::table('general_settings')->insert([
			['setting' => 'max_attmpts', 'value' => '3'],
			['setting' => 'exam_time', 'value' => '30'],
		]);
	}
}
