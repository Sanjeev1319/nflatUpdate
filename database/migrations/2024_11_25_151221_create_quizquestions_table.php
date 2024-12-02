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
        Schema::create('quizquestions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quizbank_id'); // Foreign key to quizzes table
						$table->string('category'); // banking, investment, insurance, pension
            $table->string('question'); // Question text
            $table->string('option_a'); // Option A
            $table->string('option_b'); // Option B
            $table->string('option_c')->nullable(); // Option C (optional)
            $table->string('option_d')->nullable(); // Option D (optional)
            $table->string('correct_answer'); // Correct answer (e.g., 'A', 'B', 'C', 'D')
            $table->json('explanation')->nullable(); // Explanation for the correct answer
            $table->string('language')->default('en'); // Language of the question (e.g., 'en' or 'hi')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizquestions');
    }
};
