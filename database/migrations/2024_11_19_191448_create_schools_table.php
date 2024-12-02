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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();

            // School Information
            $table->string('school_uuid')->unique();;
            $table->string('school_name');
            $table->string('school_email')->unique(); // Ensure email is unique
            $table->string('school_email_otp', 6);
            $table->string('school_mobile')->unique(); // Ensure mobile number is unique
            $table->string('school_mobile_otp', 6);
            $table->text('school_address_line_1');
            $table->string('school_area');
            $table->string('school_pincode');
            $table->string('school_district');
            $table->string('school_state');

            // Incharge Information
            $table->string('incharge_name');
            $table->string('incharge_email')->unique();
            $table->string('incharge_mobile')->unique();

            // Principal Information
            $table->string('principal_name');
            $table->string('principal_email')->unique();
            $table->string('principal_mobile')->unique();

            // Security Information
            $table->string('password'); // Password field

            // Timestamps
            $table->timestamps(); // Created and updated timestamps

            // Soft Deletes (if you want to implement soft deletion in the future)
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
