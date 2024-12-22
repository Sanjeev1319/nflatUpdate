<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SchoolLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class SchoolLoginController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function create(): Response
	{
		return Inertia::render('Auth/SchoolLogin', [
			// 'canResetPassword' => Route::has('password.request'),
			'status' => session('status'),
		]);
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(SchoolLoginRequest $request): RedirectResponse
	{
		$request->authenticate();

		$request->session()->regenerate();

		// latest session id
		$session_id = Session::getId();

		// school_uuid
		$school_uuid = Auth::guard('school')->user()->school_uuid;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $school_uuid)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

		DB::table('singleLogin')
			->insert(['session' => $session_id, 'user_id' => $school_uuid]);

		return redirect()->intended(route('school.dashboard', absolute: false));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		// school_uuid
		$school_uuid = Auth::guard('school')->user()->school_uuid;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $school_uuid)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

		Auth::guard('school')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect('/');
	}
}
