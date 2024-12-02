<?php

use App\Http\Controllers\QuizController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Student\StudentLoginController;
use App\Http\Middleware\AuthStudentMiddleware;
use App\Http\Middleware\GuestStudentMiddleware;
use App\Http\Middleware\StoreStudentUuidInSession;
use Illuminate\Support\Facades\Route;

Route::middleware(GuestStudentMiddleware::class)->name('student.')->group(function () {

	Route::get('take-a-test/login', [StudentLoginController::class, 'create'])
		->name('login');

	Route::post('take-a-test/login', [StudentLoginController::class, 'store'])->middleware(StoreStudentUuidInSession::class);
});

Route::middleware(AuthStudentMiddleware::class)->prefix('take-a-test')->name('student.')->group(function () {

	Route::get('logout', [StudentLoginController::class, 'destroy'])->name('logout');

	Route::get('/', [StudentController::class, 'studentInstruction'])->name('index');

	Route::post('start', [StudentController::class, 'startExamStore'])->name('startExam');

	Route::get('start', [StudentController::class, 'startExam'])->name('startExam');

	Route::post('quizSubmit', [QuizController::class, 'quizSubmit'])->name('quiz.submit');

	Route::post('quizIntervalSubmit', [QuizController::class, 'quizIntervalSubmit'])->name('quiz.intervalSubmit');

	Route::get('quizSubmit', [QuizController::class, 'examComplete'])->name('quiz.submit');
});
