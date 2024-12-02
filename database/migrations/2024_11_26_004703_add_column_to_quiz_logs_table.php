<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::table('quiz_logs', function (Blueprint $table) {
			$table->json('questions')->nullable(); // JSON file storing questions for the user
			$table->json('answers')->nullable(); // JSON file storing user's answers
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('quiz_logs', function (Blueprint $table) {
			//
		});
	}
};
