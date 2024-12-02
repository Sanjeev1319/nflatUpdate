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
		Schema::create('quiz_logs', function (Blueprint $table) {
			$table->id();
			$table->string('student_uuid');
			$table->dateTime('exam_start')->nullable();
			$table->dateTime('exam_end')->nullable();
			$table->integer('attempt')->nullable();
			$table->timestamps();


			$table->foreign('student_uuid')->references('student_uuid')->on('students')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('quiz_logs');
	}
};
