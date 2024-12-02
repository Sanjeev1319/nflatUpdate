<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SchoolLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

		return redirect()->intended(route('school.dashboard', absolute: false));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		Auth::guard('school')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect('school/login');
	}
}
