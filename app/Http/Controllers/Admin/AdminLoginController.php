<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AdminLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class AdminLoginController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function create(): Response
	{
		return Inertia::render('Admin/AdminLogin', [
			'status' => session('status'),
		]);
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(AdminLoginRequest $request): RedirectResponse
	{
		$request->authenticate();

		$request->session()->regenerate();

		// latest session id
		$session_id = Session::getId();

		// email
		$email = Auth::guard('admin')->user()->email;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $email)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

		DB::table('singleLogin')
			->insert(['session' => $session_id, 'user_id' => $email]);

		return redirect()->intended(route('cpanel.dashboard', absolute: false));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		// email
		$email = Auth::guard('admin')->user()->email;

		$getOldSession = DB::table('singleLogin')
			->where('user_id', $email)
			->first();

		// dd($getOldSession);
		if ($getOldSession) {
			$oldSessionId = $getOldSession->session;
			DB::table('sessions')->where('id', $oldSessionId)->delete();
			DB::table('singleLogin')->where('session', $oldSessionId)->delete();
		}

		Auth::guard('admin')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect()->route('cpanel.login');
	}
}
