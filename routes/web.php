<?php

use App\Http\Controllers\OTPController;
use App\Http\Controllers\PincodeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\School\SchoolDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return Inertia::render('Welcome', [
		'success' => session('success')
	]);
})->name('home');

// Route::get('school/dashboard', function () {
//     return Inertia::render('School/Dashboard');
// })->middleware(['auth:school'])->name('school.dashboard');


// otp verification routes
Route::post('/send-email-otp', [OTPController::class, 'sendEmailOtp'])->name('sendEmailOtp');
Route::post('/verify-email-otp', [OTPController::class, 'verifyEmailOtp'])->name('verifyEmailOtp');
Route::post('/send-mobile-otp', [OTPController::class, 'sendMobileOtp'])->name('sendMobileOtp');
Route::post('/verify-mobile-otp', [OTPController::class, 'verifyMobileOtp'])->name('verifyMobileOtp');

Route::get('sidebar', function () {
	return Inertia::render('Dashboard');
});

// API LIST
// 1. Student bulk upload api
// Route::post('/students/import', [SchoolDashboardController::class, 'import'])->name('studentUploadApi');
Route::post('/upload-students', [SchoolDashboardController::class, 'import'])->name('upload-students');
Route::get('/fetch-pincode-details', [PincodeController::class, 'getPincodeDetails'])->name("fetch.pincode.details");


// require __DIR__.'/auth.php';
require __DIR__ . '/school.php';
require __DIR__ . '/student.php';
