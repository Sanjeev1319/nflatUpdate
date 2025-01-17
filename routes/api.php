<?php

use App\Http\Controllers\ApiController;
use App\Http\Middleware\ApiKeyMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware('api')
	->name('api.')
	->group(function () {

		Route::post('nflat_school', [ApiController::class, 'nflat_school'])->name('nflat_school');
		Route::post('nflat_student', [ApiController::class, 'nflat_student'])->name('nflat_student');

	});
