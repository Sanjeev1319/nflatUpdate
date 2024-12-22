<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StudentLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

		// latest session id
		$session_id = Session::getId();

		// student_id
		$student_uuid = Auth::guard('student')->user()->student_uuid;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $student_uuid)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

		DB::table('singleLogin')
			->insert(['session' => $session_id, 'user_id' => $student_uuid]);

		return redirect()->intended(route('student.index'));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		// student_id
		$student_uuid = Auth::guard('student')->user()->student_uuid;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $student_uuid)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

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
