<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StudentLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class StudentLoginController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function create(): Response
	{
		return Inertia::render('Student/StudentLogin', [
			'status' => session('status'),
		]);
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(StudentLoginRequest $request): RedirectResponse
	{
		$request->authenticate();

		$request->session()->regenerate();

		return redirect()->intended(route('student.index'));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		Auth::guard('student')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		Session::forget("exam_start_time");
		Session::forget("student_uuid");
		Session::forget("exam_time");
		Session::forget("quiz_start");

		return redirect()->route('student.login');
	}
}
