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
			$table->integer('submit_type')->nullable(); // When the data is submitted is it at specific inteval (1) or final (2)
			$table->string('remaining_time')->nullable(); // remaining time if the data is stored in intervals
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
