<?php

use App\Http\Controllers\School\SchoolDashboardController;
use App\Http\Controllers\School\SchoolLoginController;
use App\Http\Controllers\School\SchoolRegisterController;
use App\Http\Middleware\AuthSchoolMiddleware;
use App\Http\Middleware\GuestSchoolMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(GuestSchoolMiddleware::class)->prefix('school')->name('school.')->group(function () {
	Route::get('register', [SchoolRegisterController::class, 'create'])
		->name('register');

	Route::post('register', [SchoolRegisterController::class, 'store']);

	Route::get('login', [SchoolLoginController::class, 'create'])
		->name('login');

	Route::post('login', [SchoolLoginController::class, 'store']);
});

Route::middleware(AuthSchoolMiddleware::class)->prefix('school')->name('school.')->group(function () {

	Route::post('logout', [SchoolLoginController::class, 'destroy'])->name('logout');

	Route::get('dashboard', [SchoolDashboardController::class, 'index'])->name('dashboard');
	Route::get('/', [SchoolDashboardController::class, 'index'])->name('index');

	Route::get('student_register', [SchoolDashboardController::class, 'studentRegister'])->name('studentRegister');
	Route::post('student_register', [SchoolDashboardController::class, 'studentRegisterStore']);

	Route::get('student_bulk_register', [SchoolDashboardController::class, 'studentBulkRegister'])->name('studentBulkRegister');

	Route::get('student_list', [SchoolDashboardController::class, 'studentList'])->name('studentList');

	Route::get('student-edit', [SchoolDashboardController::class, 'studentEdit'])->name('studentEdit');
	Route::post('student-edit', [SchoolDashboardController::class, 'studentEditStore'])->name('studentEditStore');

	Route::post('student_destroy', [SchoolDashboardController::class, 'studentDestroy'])->name('studentDestroy');
});
