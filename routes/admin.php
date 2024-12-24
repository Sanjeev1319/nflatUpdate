<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Middleware\AuthAdminMiddleware;
use App\Http\Middleware\GuestAdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(GuestAdminMiddleware::class)
	->prefix('cpanel')
	->name('cpanel.')
	->group(function () {

		Route::get('login', [AdminLoginController::class, 'create'])
			->name('login');

		Route::post('login', [AdminLoginController::class, 'store']);
	});

Route::middleware(AuthAdminMiddleware::class)
	->prefix('cpanel')
	->name('cpanel.')
	->group(function () {

		Route::post('logout', [AdminLoginController::class, 'destroy'])
			->name('logout');

		Route::get('/', [AdminController::class, 'dashboard'])
			->name('dashboard');

		Route::get('/school', [AdminController::class, 'school'])
			->name('school');

		Route::get('schoolExport', [AdminController::class, 'schoolExport'])
			->name('schoolExport');

		Route::get('/school/{uuid}', [AdminController::class, 'schoolView'])
			->name('schoolView');

	});
