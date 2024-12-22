<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class GuestStudentMiddleware
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
	 */
	public function handle(Request $request, Closure $next): Response
	{
		if (Auth::guard('student')->check()) {
			$user = Auth::guard('student')->user();
			$currentSessionId = session()->getId();

			// Fetch active sessions for the user
			$existingSession = DB::table('sessions')
				->where('user_id', $user->id)
				->where('id', '!=', $currentSessionId)
				->first();

			// Invalidate older sessions
			if ($existingSession) {
				DB::table('sessions')->where('id', $existingSession->id)->delete();
			}

			return redirect()->route('student.index'); // Replace with your dashboard route
		}

		return $next($request);
	}
}
